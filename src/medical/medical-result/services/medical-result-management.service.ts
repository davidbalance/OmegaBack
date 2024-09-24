import { Inject, Injectable } from "@nestjs/common";
import { MedicalResultRepository } from "../repositories/medical-result.repository";
import { MedicalResultRequestDto } from "../dtos/request/medical-result.base.dto";
import { MedicalOrderManagementService } from "@/medical/medical-order/services/medical-order-management.service";
import { MedicalResult } from "../dtos/response/medical-result.base.dto";
import { MedicalReportEntity } from "@/medical/medical-report/entities/medical-report.entity";
import { signaturePath } from "@/shared/utils";

@Injectable()
export class MedicalResultManagementService {

  constructor(
    @Inject(MedicalResultRepository) private readonly repository: MedicalResultRepository,
    @Inject(MedicalOrderManagementService) private readonly orderService: MedicalOrderManagementService
  ) { }

  async create({ order: orderId, ...data }: MedicalResultRequestDto): Promise<MedicalResult> {
    const order = await this.orderService.findOne(orderId);
    const doctorSignature = signaturePath({ dni: data.doctorDni });
    const medicalResults = await this.repository.create({
      ...data,
      doctorSignature,
      order: order as any
    });
    return { ...medicalResults, diseases: [], reportId: undefined, reportHasFile: undefined };
  }

  async findOne(id: number): Promise<MedicalResult> {
    const medicalResult = await this.repository.findOne({
      where: { id: id },
      relations: { order: { client: true }, report: true }
    });

    return { ...medicalResult, reportId: medicalResult.report?.id || undefined, reportHasFile: medicalResult.report?.hasFile || undefined, diseases: medicalResult.diseases.map(e => `${e.diseaseName}, ${e.diseaseCommentary}`) };
  }

  async findDoctor(id: number): Promise<{ doctorDni: string, doctorFullname: string, doctorSignature: string }> {
    const medicalResult = await this.repository.findOne({
      where: { id: id },
      relations: { order: { client: true } }
    });

    return medicalResult;
  }

  async findOrder(id: number): Promise<{ id: number; process: string }> {
    const { order } = await this.repository.findOne({
      where: { id: id },
      relations: { order: true }
    });
    return order;
  }

  async findLocation(id: number): Promise<{ corporativeName: string, companyRuc: string, companyName: string, branchName: string }> {
    const { order } = await this.repository.findOne({
      where: { id: id },
      relations: { order: true }
    });

    return order;
  }

  async findClient(id: number): Promise<{ dni: string, name: string, lastname: string, birthday: Date }> {
    const { order } = await this.repository.findOne({
      where: { id: id },
      relations: { order: { client: true } }
    });
    const { client } = order;

    return client;
  }

  async updateOne(id: number, data: Partial<Omit<MedicalResult, 'diseases'>>): Promise<MedicalResult> {
    const medicalResult = await this.repository.findOneAndUpdate({ id }, data);
    return { ...medicalResult, reportId: medicalResult.report.id, reportHasFile: medicalResult.report.hasFile, diseases: medicalResult.diseases.map(e => `${e.diseaseName}, ${e.diseaseCommentary}`) };
  }

  async attachReport(id: number, report: MedicalReportEntity): Promise<void> {
    await this.repository.findOneAndUpdate({ id }, { report });
  }

  async deleteOne(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
