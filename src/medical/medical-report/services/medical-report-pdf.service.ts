import { Inject, Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import dayjs from 'dayjs';
import path from 'path';
import { INJECT_STORAGE_MANAGER, StorageManager } from '@/shared/storage-manager';
import { PdfManagerService } from '@/shared/pdf-manager';
import { fileReportPath } from '@/shared/utils';
import { MedicalReport } from '../entities/medical-report.entity';
import { MedicalReportRepository } from '../repositories/medical-report.repository';
import { medicalReportDocumentLayout } from '../utils/medical-rreport-document-layout';

@Injectable()
export class MedicalReportPdfService {

  constructor(
    @Inject(PdfManagerService) private readonly pdfService: PdfManagerService,
    @Inject(INJECT_STORAGE_MANAGER) private readonly storage: StorageManager,
    @Inject(MedicalReportRepository) private readonly repository: MedicalReportRepository
  ) { }

  public async craft(data: MedicalReport): Promise<MedicalReport> {
    const filepath: string = await this.processPdf(data);
    try {
      const newMedicalReport: MedicalReport = await this.repository.findOneAndUpdate({ id: data.id }, { fileAddress: filepath, hasFile: true });
      return newMedicalReport;
    } catch (error) {
      const newMedicalReport: MedicalReport = await this.repository.findOneAndUpdate({ id: data.id }, { fileAddress: null, hasFile: false });
      return newMedicalReport;
    }
  }

  public async redoPdf(id: number): Promise<MedicalReport> {
    const medicalReport = await this.repository.findOne({ where: { id } });
    return this.craft(medicalReport);
  }

  public async redoPdfsByDni(dni: string): Promise<MedicalReport[]> {
    const medicalReports = await this.repository.find({ where: { patientDni: dni } });
    const redo = await Promise.all(medicalReports.map(this.craft));
    return redo;
  }

  public async redoPdfs(): Promise<MedicalReport[]> {
    const medicalReports = await this.repository.find();
    const redo = await Promise.all(medicalReports.map(this.craft));
    return redo;
  }

  private async processPdf(data: MedicalReport): Promise<string> {
    const directory = path.resolve(data.doctorSignature);
    const signatureImg = readFileSync(directory);
    const base64 = Buffer.from(signatureImg).toString('base64');

    const newContent = this.pdfService.parseHtml(data.content);

    const baseContent = this.getContent(data, base64);

    const docLayout = medicalReportDocumentLayout(baseContent, newContent);

    // const templateDirectory = path.resolve('templates/medical-result/medical-report');
    // const templateFile = path.join(templateDirectory, 'template.hbs');

    const buffer = await this.pdfService.craft(docLayout);

    const filePath = fileReportPath({ dni: data.patientDni, order: data.order });

    const output = this.storage.saveFile(buffer, '.pdf', filePath, data.examName.toLocaleLowerCase().replace(/\s/g, '_'));

    return output;
  }

  private getContent = (data: Omit<MedicalReport, 'content'>, base64: string) => ({
    title: 'Omega report',
    patientFullname: data.patientFullname,
    patientAge: dayjs().diff(data.patientBirthday, 'years'),
    patientDni: data.patientDni,
    date: dayjs(data.createAt).format('dddd, MMMM D, YYYY'),
    company: data.companyName,
    examName: data.examName,
    doctorFullname: data.doctorFullname,
    doctorDni: data.doctorDni,
    doctorSignature: `data:image/png;base64,${base64}`
  });
}
