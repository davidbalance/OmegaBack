import { Injectable, Inject } from "@nestjs/common";
import { MedicalOrderRepository } from "../repositories/medical-order.repository";
import { MedicalOrderCloud } from "../dtos/response/medical-order-cloud.base.dto";
import { MedicalOrderCloudFile } from "../dtos/response/medical-order-cloud-file.base.dto";

@Injectable()
export class MedicalOrderCloudService {

  constructor(
    @Inject(MedicalOrderRepository) private readonly repository: MedicalOrderRepository
  ) { }

  async findOne(id: number): Promise<MedicalOrderCloud> {
    const { client, results, hasFile, } = await this.repository.findOne({ where: { id }, relations: { client: true, results: true } });
    const fileReports: MedicalOrderCloudFile[] = results
      .filter(e => !!e.report)
      .map<MedicalOrderCloudFile>(e => ({
        id: e.id,
        examName: e.examName,
        hasFile: e.hasFile,
        type: 'report'
      }))
    const fileResults: MedicalOrderCloudFile[] = results
      .map<MedicalOrderCloudFile>(e => ({
        id: e.id,
        examName: e.examName,
        hasFile: e.hasFile,
        type: 'result'
      }));
    const cloudItem: MedicalOrderCloud = {
      dni: client.dni,
      fullname: `${client.name} ${client.lastname}`,
      hasFile: hasFile,
      fileResults: fileResults,
      fileReports: fileReports
    };
    return cloudItem;
  }
}
