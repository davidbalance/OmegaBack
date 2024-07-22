import { Injectable, Inject } from "@nestjs/common";
import { MedicalReport } from "../entities/medical-report.entity";
import { MedicalReportRepository } from "../repositories/medical-report.repository";
import { MedicalReportPdfService } from "./medical-report-pdf.service";
import { MedicalResultManagementService } from "@/medical/medical-result/services/medical-result-management.service";
import { POSTMedicalReportRequestDto } from "../dtos/request/post.medical-report.request.dto";

@Injectable()
export class MedicalReportManagementService {

  constructor(
    @Inject(MedicalReportRepository) private readonly repository: MedicalReportRepository,
    @Inject(MedicalReportPdfService) private readonly pdf: MedicalReportPdfService,
    @Inject(MedicalResultManagementService) private readonly service: MedicalResultManagementService
  ) { }

  async create({ medicalResult: medicalResultId, ...data }: POSTMedicalReportRequestDto): Promise<MedicalReport> {
    const medicalResult = await this.service.findOne(medicalResultId);
    const { order } = medicalResult;
    const { client } = order;
    const report = await this.repository.create({
      content: data.content,
      order: order.id,
      companyName: order.companyName,
      patientDni: client.dni,
      patientBirthday: client.birthday,
      patientFullname: client.fullname,
      examName: medicalResult.examName,
      doctorDni: medicalResult.doctorDni,
      doctorFullname: medicalResult.doctorFullname,
      doctorSignature: medicalResult.doctorSignature,
    });
    const attachedFile = await this.pdf.craft(report);
    await this.service.updateOne(medicalResultId, { report: attachedFile });
    return attachedFile;
  }

  async findAll(): Promise<MedicalReport[]> {
    const reports = await this.repository.find();
    return reports;
  }

  async findOne(id: number): Promise<MedicalReport> {
    const report = await this.repository.findOne({ where: { id } });
    return report;
  }

  async findByDni(dni: string): Promise<MedicalReport[]> {
    const report = await this.repository.find({ where: { patientDni: dni } });
    return report;
  }

  async updateOne(id: number, data: Partial<MedicalReport>): Promise<MedicalReport> {
    const report = await this.repository.findOneAndUpdate({ id }, data);
    return report;
  }

  async deleteOne(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
