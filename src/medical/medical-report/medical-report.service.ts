import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { MedicalReportRepository } from './medical-report.repository';
import { MedicalReport } from './entities/medical-report.entity';
import { FindFilePathService, PdfManagerService, RemoveFileService, fileReportPath } from '@/shared';
import { readFileSync } from 'fs';
import dayjs from 'dayjs';
import path from 'path';
import { StorageManager } from '@/shared/storage-manager';
import { SendAttributeService } from './send-attribute/send-attribute.service';
import { POSTMedicalReportRequestDto } from './dtos/medical-report.request.dto';

@Injectable()
export class MedicalReportService implements
  FindFilePathService<number>,
  RemoveFileService<number> {

  constructor(
    @Inject(MedicalReportRepository) private readonly repository: MedicalReportRepository,
    @Inject(PdfManagerService) private readonly pdfService: PdfManagerService,
    @Inject(StorageManager) private readonly storageManager: StorageManager,
    @Inject(SendAttributeService) private readonly attributeService: SendAttributeService
  ) { }

  /**
   * Obtiene la direccion donde se aloja un archivo.
   * @param key 
   * @returns 
   */
  async getpath(key: number): Promise<string> {
    const file = await this.repository.findOne({
      where: { id: key },
      select: {
        id: true,
        fileAddress: true
      }
    });
    return file.fileAddress;
  }

  /**
   * Elimina el archivo asociado al reporte medico.
   * @param key 
   * @returns 
   */
  async removeFile(key: number): Promise<boolean> {
    try {
      const file = await this.repository.findOne({
        where: { id: key },
        select: {
          id: true,
          fileAddress: true
        }
      });
      this.storageManager.deleteFile(file.fileAddress);
      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  }

  /**
   * Crea un reporte medico.
   * @param param0 
   * @returns 
   */
  async create({ ...data }: POSTMedicalReportRequestDto): Promise<MedicalReport> {
    const report = await this.repository.create({ ...data });
    const newReport = await this.processReportPdf(report);
    return newReport;
  }

  /**
   * Recrea un reporte medico dado un dni.
   * @param patientDni 
   */
  async recreateReport(patientDni?: string): Promise<void> {
    const reports = await this.repository.find({ where: { patientDni }, select: { id: true } });
    try {
      for (const report of reports) {
        await this.processReportPdf(report);
      }
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * Procesa los datos del reporte medico para generar un pdf.
   * @param report 
   * @returns 
   */
  private async processReportPdf(report: MedicalReport): Promise<MedicalReport> {
    const filename = await this.createPdf(report.id);
    const newReport = await this.repository.findOneAndUpdate({ id: report.id }, { fileAddress: filename, hasFile: true });
    return newReport;
  }

  /**
   * Crea el pdf y lo almacena en la memoria de la computadora.
   * @param id 
   * @returns 
   */
  private async createPdf(id: number): Promise<string> {
    const reportData = await this.repository.findOne({ where: { id } });
    const directory = path.resolve(reportData.doctorSignature);
    const signatureImg = readFileSync(directory);
    const base64 = Buffer.from(signatureImg).toString('base64');

    const content = this.getContent(reportData, base64);

    const templateDirectory = path.resolve('templates/medical-result/medical-report');
    const templateFile = path.join(templateDirectory, 'template.hbs');

    const buffer = await this.pdfService.craft(templateFile, content);

    const filePath = fileReportPath({ dni: reportData.patientDni, order: reportData.order });


    const output = this.storageManager.saveFile(buffer, '.pdf', filePath, reportData.examName.toLocaleLowerCase().replace(/\s/g, '_'));

    return output;
  }

  /**
   * Genera el contenido requerido para generar el pdf.
   * @param report 
   * @param base64 
   * @returns 
   */
  private getContent = (report: MedicalReport, base64: string) => ({
    title: 'Omega report',
    patientFullname: report.patientFullname,
    patientAge: dayjs().diff(report.patientBirthday, 'years'),
    patientDni: report.patientDni,
    date: dayjs(report.createAt).format('dddd, MMMM D, YYYY'),
    company: report.companyName,
    examName: report.examName,
    content: report.content,
    doctorFullname: report.doctorFullname,
    doctorDni: report.doctorDni,
    doctorSignature: `data:image/png;base64,${base64}`
  });

  /**
   * Añade un atributo de envio a un resultado medico.
   * @param id 
   * @param value 
   * @returns 
   */
  async assignSendAttribute(id: number, value: string): Promise<MedicalReport> {
    const attribute = await this.attributeService.create({ value: value });
    const { sendAttributes } = await this.repository.findOne({ where: { id: id }, relations: { sendAttributes: true } });
    sendAttributes.concat(attribute);
    const report = await this.repository.findOneAndUpdate({ id: id }, { sendAttributes: sendAttributes });
    return report;
  }
}
