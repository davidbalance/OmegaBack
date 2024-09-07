import { Injectable, Inject } from "@nestjs/common";
import { MedicalOrderRepository } from "../repositories/medical-order.repository";
import { MedicalOrder } from "../dtos/response/medical-order.base.dto";
import { MedicalOrderEntity } from "../entities/medical-order.entity";

@Injectable()
export class MedicalOrderManagementService {

  constructor(
    @Inject(MedicalOrderRepository) private readonly repository: MedicalOrderRepository
  ) { }

  async find(): Promise<MedicalOrder[]> {
    const medicalOrders = await this.repository.find();
    return medicalOrders;
  }

  async findOne(id: number): Promise<MedicalOrder> {
    const medicalOrder = await this.repository.findOne({ where: { id: id } });
    return medicalOrder;
  }

  async updateOne(id: number, data: Partial<MedicalOrderEntity>): Promise<MedicalOrder> {
    const medicalOrder = await this.repository.findOneAndUpdate({ id }, data);
    return medicalOrder;
  }

  async deleteOne(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
