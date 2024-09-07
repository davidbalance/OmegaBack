import { Inject, Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import dayjs from 'dayjs';
import es from "dayjs/locale/es";
import path from 'path';
import { INJECT_STORAGE_MANAGER, StorageManager } from '@/shared/storage-manager';
import { fileReportPath } from '@/shared/utils';
import { MedicalReportRepository } from '../repositories/medical-report.repository';
import { medicalReportDocumentLayout } from '../utils/medical-report-document-layout';
import { PdfManagerService } from '@/shared/pdf-manager/pdf-manager.service';
import { MedicalReportEntity } from '../entities/medical-report.entity';

@Injectable()
export class MedicalReportPdfService {

  constructor(
    @Inject(MedicalReportRepository) private readonly repository: MedicalReportRepository,
    @Inject(PdfManagerService) private readonly pdfService: PdfManagerService,
    @Inject(INJECT_STORAGE_MANAGER) private readonly storage: StorageManager,
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

  private async processPdf(data: MedicalReportEntity): Promise<string> {
    const signatureDirectory = path.resolve(data.doctorSignature);
    const signatureImg = readFileSync(signatureDirectory);
    const signatureBase64 = Buffer.from(signatureImg).toString('base64');

    const headerDirectory = path.resolve('templates/medical-result/medical-report/header.png');
    const headerImg = readFileSync(headerDirectory);
    const headerBase64 = Buffer.from(headerImg).toString('base64');

    const newContent = this.pdfService.parseHtml(data.content);

    const baseContent = this.getContent(data, {
      signature: signatureBase64,
      header: headerBase64
    });

    const docLayout = medicalReportDocumentLayout(baseContent, newContent);

    const buffer = await this.pdfService.craft(docLayout);

    const filePath = fileReportPath({ dni: data.patientDni, order: data.order });

    const output = this.storage.saveFile(buffer, '.pdf', filePath, data.examName.toLocaleLowerCase().replace(/\s/g, '_'));

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
