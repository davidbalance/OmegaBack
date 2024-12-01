import { Injectable, Inject } from "@nestjs/common";
import { MedicalOrderRepository } from "../repositories/medical-order.repository";
import { MedicalOrder } from "../dtos/response/medical-order.base.dto";
import { MedicalOrderEntity } from "../entities/medical-order.entity";
import { MedicalOrderRequestDto } from "../dtos/request/medical-order.base.dto";
import { MedicalClientManagementService } from "@/medical/medical-client/services/medical-client-management.service";

@Injectable()
export class MedicalOrderManagementService {

  constructor(
    @Inject(MedicalClientManagementService) private readonly clientService: MedicalClientManagementService,
    @Inject(MedicalOrderRepository) private readonly repository: MedicalOrderRepository
  ) { }

  async find(): Promise<MedicalOrder[]> {
    const medicalOrders = await this.repository.find();
    return medicalOrders;
  }

  async findOne(id: number): Promise<MedicalOrder> {
    return this.repository.findOne({ where: { id: id } });
  }
  
  async create({ patientDni, ...data }: MedicalOrderRequestDto): Promise<MedicalOrder> {
    const client = await this.clientService.findOneByDni(patientDni);
    return this.repository.create({ ...data, client });
  }

  async updateOne(id: number, data: Partial<MedicalOrderEntity>): Promise<MedicalOrder> {
    const medicalOrder = await this.repository.findOneAndUpdate({ id }, data);
    return medicalOrder;
  }

  async deleteOne(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
