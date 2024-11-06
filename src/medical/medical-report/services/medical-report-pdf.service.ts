import { Inject, Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import es from "dayjs/locale/es";
import { fileReportPath } from '@/shared/utils';
import { MedicalReportRepository } from '../repositories/medical-report.repository';
import { medicalReportDocumentLayout } from '../utils/medical-report-document-layout';
import { PdfManagerService } from '@/shared/pdf-manager/pdf-manager.service';
import { MedicalReportEntity } from '../entities/medical-report.entity';
import { NEST_PATH } from '@/shared/nest-ext/path/inject-token';
import { Path } from '@/shared/nest-ext/path/path.type';
import { FILE_SYSTEM } from '@/shared/file-system/inject-token';
import { IFileSystem } from '@/shared/file-system/file-system.interface';
import { FS } from '@/shared/nest-ext/fs/fs.type';
import { NEST_FS } from '@/shared/nest-ext/fs/inject-token';

@Injectable()
export class MedicalReportPdfService {

  constructor(
    @Inject(MedicalReportRepository) private readonly repository: MedicalReportRepository,
    @Inject(PdfManagerService) private readonly pdfService: PdfManagerService,
    @Inject(FILE_SYSTEM) private readonly fileSystem: IFileSystem,
    @Inject(NEST_PATH) private readonly path: Path,
    @Inject(NEST_FS) private readonly fs: FS,
  ) { }

  public async craft(data: MedicalReportEntity): Promise<MedicalReportEntity> {
    try {
      const filepath: string = await this.processPdf(data);
      const newMedicalReport: MedicalReportEntity = await this.repository.findOneAndUpdate({ id: data.id }, { fileAddress: filepath, hasFile: true });
      return newMedicalReport;
    } catch (error) {
      const newMedicalReport: MedicalReportEntity = await this.repository.findOneAndUpdate({ id: data.id }, { fileAddress: null, hasFile: false });
      return newMedicalReport;
    }
  }

  public async redoPdf(id: number): Promise<MedicalReportEntity> {
    const medicalReport = await this.repository.findOne({ where: { id } });
    return this.craft(medicalReport);
  }

  public async redoPdfsByDni(dni: string): Promise<MedicalReportEntity[]> {
    const medicalReports = await this.repository.find({ where: { patientDni: dni } });
    const redo = await Promise.all(medicalReports.map(this.craft));
    return redo;
  }

  public async redoPdfs(): Promise<MedicalReportEntity[]> {
    const medicalReports = await this.repository.find();
    const redo = await Promise.all(medicalReports.map(this.craft));
    return redo;
  }

  private async signatureBase64(path: string): Promise<string> {
    const buffer = await this.fileSystem.read(path);
    return buffer.toString('base64');
  }

  private headerBase64(path: string): string {
    console.log(path);
    const headerDirectory = this.path.resolve(path);
    const buffer = this.fs.readFileSync(headerDirectory);
    return buffer.toString('base64');
  }

  private async processPdf(data: MedicalReportEntity): Promise<string> {
    const headerPath = 'templates/medical-result/medical-report/header.png';
    const signature = await this.signatureBase64(data.doctorSignature);
    const header = this.headerBase64(headerPath);

    const htmlContent = this.pdfService.parseHtml(data.content);

    const reportContent = this.getContent(data, {
      signature: signature,
      header: header
    });

    const docLayout = medicalReportDocumentLayout(reportContent, htmlContent);

    const buffer = await this.pdfService.craft(docLayout);

    const filepath = fileReportPath({ dni: data.patientDni, order: data.order });
    const filename = data.examName.toLocaleLowerCase().replace(/\s/g, '_');
    const output = this.fileSystem.write(filepath, buffer, { extension: '.pdf', filename: filename });

    return output;
  }

  private getContent = (data: Omit<MedicalReportEntity, 'content'>, image: { signature: string, header: string }) => ({
    header: `data:image/png;base64,${image.header}`,
    title: 'Omega report',
    patientFullname: data.patientFullname,
    patientAge: dayjs().diff(data.patientBirthday, 'years'),
    patientDni: data.patientDni,
    date: dayjs(data.createAt).locale(es).format('dddd, MMMM D, YYYY'),
    company: data.companyName,
    examName: data.examName,
    doctorFullname: data.doctorFullname,
    doctorDni: data.doctorDni,
    doctorSignature: `data:image/png;base64,${image.signature}`,
  });
}
