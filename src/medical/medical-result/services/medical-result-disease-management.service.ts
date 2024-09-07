import { Injectable, Inject } from "@nestjs/common";
import { MedicalResultDiseaseRepository } from "../repositories/medical-result-disease.repository";
import { PostMedicalResultDiseaseRequestDto } from "../dtos/request/medical-result-disease.post.dto";
import { MedicalResultDisease } from "../dtos/response/medical-result.-disease.base.dto";

@Injectable()
export class MedicalResultDiseaseManagementService {

  constructor(
    @Inject(MedicalResultDiseaseRepository) private readonly repository: MedicalResultDiseaseRepository,
  ) { }

  async create({ medicalResultId, ...data }: PostMedicalResultDiseaseRequestDto): Promise<MedicalResultDisease> {
    const medicalResultDisease = await this.repository.create({ ...data, result: { id: medicalResultId } });
    return medicalResultDisease;
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
