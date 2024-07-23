import { Inject, Injectable } from "@nestjs/common";
import { MedicalResultRepository } from "../repositories/medical-result.repository";
import { MedicalResult } from "../entities/medical-result.entity";

@Injectable()
export class MedicalResultManagementService {

  constructor(
    @Inject(MedicalResultRepository) private readonly repository: MedicalResultRepository,
  ) { }

  async create(data: Omit<MedicalResult, 'id'>): Promise<MedicalResult> {
    const medicalResults = await this.repository.create(data);
    return medicalResults;
  }

  async findAll(): Promise<MedicalResult[]> {
    const medicalResults = await this.repository.find();
    return medicalResults;
  }

  async findAllByDoctor(doctor: string): Promise<MedicalResult[]> {
    const medicalResults = await this.repository.find({
      where: { doctorDni: doctor }
    });
    return medicalResults;
  }

  async findOne(id: number): Promise<MedicalResult> {
    const medicalResult = await this.repository.findOne({
      where: { id: id },
      relations: { order: { client: true } }
    });
    return medicalResult;
  }

  async updateOne(id: number, data: Partial<MedicalResult>): Promise<MedicalResult> {
    const medicalResult = await this.repository.findOneAndUpdate({ id }, data);
    return medicalResult;
  }

  async deleteOne(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
