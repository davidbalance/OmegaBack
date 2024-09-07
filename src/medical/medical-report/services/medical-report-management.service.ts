import { Injectable, Inject } from "@nestjs/common";
import { MedicalReportRepository } from "../repositories/medical-report.repository";
import { MedicalReportPdfService } from "./medical-report-pdf.service";
import { MedicalResultManagementService } from "@/medical/medical-result/services/medical-result-management.service";
import { PostMedicalReportRequestDto } from "../dtos/request/medical-report.post.dto";
import { MedicalReportFileManagementService } from "./medical-report-file-management.service";
import { MedicalReport } from "../dtos/response/medical-report.base.dto";

@Injectable()
export class MedicalReportManagementService {

  constructor(
    @Inject(MedicalReportRepository) private readonly repository: MedicalReportRepository,
    @Inject(MedicalReportPdfService) private readonly pdf: MedicalReportPdfService,
    @Inject(MedicalResultManagementService) private readonly service: MedicalResultManagementService,
    @Inject(MedicalReportFileManagementService) private readonly file: MedicalReportFileManagementService
  ) { }

  async create({ medicalResult: medicalResultId, ...data }: PostMedicalReportRequestDto): Promise<MedicalReport> {
    const medicalResult = await this.service.findOne(medicalResultId);
    const doctor = await this.service.findDoctor(medicalResultId);
    const order = await this.service.findOrder(medicalResultId);
    const location = await this.service.findLocation(medicalResultId);
    const client = await this.service.findClient(medicalResultId);
    const fullname = `${client.name} ${client.lastname}`;
    const report = await this.repository.create({
      content: data.content,
      order: order.id,
      companyName: location.companyName,
      patientDni: client.dni,
      patientBirthday: client.birthday,
      patientFullname: fullname,
      examName: medicalResult.examName,
      doctorDni: doctor.doctorDni,
      doctorFullname: doctor.doctorFullname,
      doctorSignature: doctor.doctorSignature,
    });
    const attachedFile = await this.pdf.craft(report);
    await this.service.attachReport(medicalResultId, attachedFile);
    return attachedFile;
  }

  async findOne(id: number): Promise<MedicalReport> {
    const report = await this.repository.findOne({ where: { id } });
    return report;
  }

  async updateOne(id: number, data: Partial<MedicalReport>): Promise<MedicalReport> {
    const report = await this.repository.findOneAndUpdate({ id }, data);
    return report;
  }

  async deleteOne(id: number): Promise<void> {
    await this.file.removeFile(id);
    await this.repository.findOneAndDelete({ id });
  }
}
