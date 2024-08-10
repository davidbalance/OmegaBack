import { Injectable, Inject } from "@nestjs/common";
import { MedicalOrderRepository } from "../repositories/medical-order.repository";
import { MedicalOrderCloudResponseDto } from "../dtos/response/base.medical-order-cloud.response.dto";
import { MedicalOrderCloudFileResponseDto } from "../dtos/response/base.medical-order-cloud-file.response.dto";

@Injectable()
export class MedicalOrderCloudService {

  constructor(
    @Inject(MedicalOrderRepository) private readonly repository: MedicalOrderRepository
  ) { }

  async findOne(id: number): Promise<MedicalOrderCloudResponseDto> {
    const { client, results } = await this.repository.findOne({ where: { id }, relations: { client: true, results: true } });
    const fileReports: MedicalOrderCloudFileResponseDto[] = results
      .filter(e => !!e.report)
      .map<MedicalOrderCloudFileResponseDto>(e => ({
        id: e.id,
        examName: e.examName,
        hasFile: e.hasFile,
        type: 'report'
      }))
    const fileResults: MedicalOrderCloudFileResponseDto[] = results
      .map<MedicalOrderCloudFileResponseDto>(e => ({
        id: e.id,
        examName: e.examName,
        hasFile: e.hasFile,
        type: 'result'
      }));
    const cloudItem: MedicalOrderCloudResponseDto = {
      dni: client.dni,
      fullname: `${client.name} ${client.lastname}`,
      fileResults: fileResults,
      fileReports: fileReports
    };
    return cloudItem;
  }
}
