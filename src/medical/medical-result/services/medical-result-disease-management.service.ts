import { Injectable, Inject } from "@nestjs/common";
import { MedicalResultDiseaseRepository } from "../repositories/medical-result-disease.repository";
import { MedicalResultManagementService } from "./medical-result-management.service";
import { MedicalResultDisease } from "../entities/medical-result-disease.entity";
import { PostMedicalResultDiseaseRequestDto } from "../dtos/request/post.medical-result-disease.dto";

@Injectable()
export class MedicalResultDiseaseManagementService {

  constructor(
    @Inject(MedicalResultDiseaseRepository) private readonly repository: MedicalResultDiseaseRepository,
    @Inject(MedicalResultManagementService) private readonly service: MedicalResultManagementService,
  ) { }

  async create({ medicalResultId, ...data }: PostMedicalResultDiseaseRequestDto): Promise<MedicalResultDisease> {
    const medicalResult = await this.service.findOne(medicalResultId);
    const medicalResultDisease = await this.repository.create({ ...data, result: medicalResult });
    return medicalResultDisease;
  }

  async findAll(): Promise<MedicalResultDisease[]> {
    const medicalResultDiseases = await this.repository.find();
    return medicalResultDiseases;
  }

  async findOne(id: number): Promise<MedicalResultDisease> {
    const medicalResultDisease = await this.repository.findOne({ where: { id } });
    return medicalResultDisease;
  }

  async updateOne(id: number, data: Partial<MedicalResultDisease>): Promise<MedicalResultDisease> {
    const medicalResultDisease = await this.repository.findOneAndUpdate({ id }, data);
    return medicalResultDisease;
  }

  async deleteOne(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
