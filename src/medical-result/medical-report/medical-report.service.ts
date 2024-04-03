import { Inject, Injectable, StreamableFile } from '@nestjs/common';
import { MedicalReportRepository } from './medical-report.repository';
import { CreateMedicalReportRequestDTO } from '../common/dtos';
import { MedicalReport } from './entities/medical-report.entity';
import { PdfManagerService } from '@/shared';
import { readFileSync } from 'fs';
import dayjs from 'dayjs';
import path from 'path';
import { StorageManager } from '@/shared/storage-manager';

@Injectable()
export class MedicalReportService {

  constructor(
    @Inject(MedicalReportRepository) private readonly repository: MedicalReportRepository,
    @Inject(PdfManagerService) private readonly pdfService: PdfManagerService,
    @Inject(StorageManager) private readonly storageManager: StorageManager
  ) { }

  async create({ ...data }: CreateMedicalReportRequestDTO): Promise<MedicalReport> {
    const report = await this.repository.create({ ...data });
    const filename = await this.createPdf(report.id);
    const newReport = await this.repository.findOneAndUpdate({ id: report.id }, { fileAddress: filename, hasFile: true });
    return newReport;
  }

  async getPdf(id: number): Promise<StreamableFile> {
    const report = await this.repository.findOne({ where: { id }, select: { fileAddress: true } });
    return this.storageManager.readFile(report.fileAddress);
  }

  async createPdf(id: number): Promise<string> {
    const reportData = await this.repository.findOne({ where: { id } });

    const directory = path.resolve(reportData.doctorSignature);
    const signatureImg = readFileSync(directory);
    const base64 = Buffer.from(signatureImg).toString('base64');

    const content = this.getContent(reportData, base64);

    const templateDirectory = path.resolve('templates/medical-result/medical-report');
    const templateFile = path.join(templateDirectory, 'template.hbs');

    const buffer = await this.pdfService.craft(templateFile, content);

    const output = this.storageManager.saveFile(buffer, '.pdf', `medical-report/${reportData.patientDni}/${reportData.order}`);

    return output;
  }

  private getContent = (report: MedicalReport, base64: string) => ({
    title: 'Omega report',
    patientFullname: report.patientFullname,
    patientAge: report.patientAge,
    patientDni: report.patientDni,
    date: dayjs(report.createAt).format('dddd, MMMM D, YYYY'),
    company: report.companyName,
    examName: report.examName,
    content: report.content,
    doctorFullname: report.doctorFullname,
    doctorDni: report.doctorDni,
    doctorSignature: `data:image/png;base64,${base64}`
  });
}
