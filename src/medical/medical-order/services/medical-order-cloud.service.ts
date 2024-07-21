import { Injectable, Inject } from "@nestjs/common";
import { MedicalOrderRepository } from "../repositories/medical-order.repository";
import { MedicalOrderCloud, MedicalOrderFile } from "../dtos/medical-order-cloud.dto";


@Injectable()
export class MedicalOrderCloudService {

  constructor(
    @Inject(MedicalOrderRepository) private readonly repository: MedicalOrderRepository
  ) { }

  async findOne(id: number): Promise<MedicalOrderCloud> {
    const { client, results } = await this.repository.findOne({ where: { id } });

    const fileReports: MedicalOrderFile[] = results
      .filter(e => !!e.report)
      .map(e => ({ ...e, type: 'report' }))
    const fileResults: MedicalOrderFile[] = results
      .map(e => ({ ...e, type: 'result' }));

    const cloudItem: MedicalOrderCloud = {
      dni: client.dni,
      fullname: client.fullname,
      fileResults: fileReports,
      fileReports: fileResults
    };

    return cloudItem;
  }
}
