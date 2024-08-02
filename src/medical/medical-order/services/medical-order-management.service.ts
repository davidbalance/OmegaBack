import { Injectable, Inject } from "@nestjs/common";
import { MedicalOrder } from "../entities/medical-order.entity";
import { MedicalOrderRepository } from "../repositories/medical-order.repository";
import { MedicalClientService } from "@/medical/medical-client/services/medical-client.service";

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

  async findAllByPatient(dni: string): Promise<MedicalOrder[]> {
    const medicalOrders = await this.repository.find({
      where: { client: { dni } },
      relations: {
        results: {
          diseases: true
        }
      }
    });
    return medicalOrders;
  }

  async findAllByPatientAndDoctor(patient: string, doctor: string): Promise<MedicalOrder[]> {
    const orders = await this.repository.query('medicalOrder')
      .leftJoinAndSelect('medicalOrder.results', 'medicalResult', 'medicalResult.doctorDni = :doctor', { doctor })
      .leftJoinAndSelect('medicalResult.report', 'medicalReport')
      .leftJoinAndSelect('medicalOrder.client', 'medicalClient')
      .where('medicalClient.dni = :patient', { patient })
      .andWhere('medicalResult.doctorDni = :doctor', { doctor })
      .getMany();

    return orders;
  }

  async updateOne(id: number, data: Partial<MedicalOrder>): Promise<MedicalOrder> {
    const medicalOrder = await this.repository.findOneAndUpdate({ id }, data);
    return medicalOrder;
  }

  async deleteOne(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
