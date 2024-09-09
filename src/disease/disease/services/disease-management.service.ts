import { Inject, Injectable } from '@nestjs/common';
import { DiseaseGroupManagementService } from '@/disease/disease-group/services/disease-group-management.service';
import { DiseaseRepository } from '../repositories/disease.repository';
import { PostDiseaseRequestDto } from '../dtos/request/disease.post.dto';
import { PatchDiseaseRequestDto } from '../dtos/request/disease.patch.dto';
import { Disease } from '../dtos/response/disease.base.dto';

@Injectable()
export class DiseaseManagementService {

  constructor(
    @Inject(DiseaseRepository) private readonly repository: DiseaseRepository,
    @Inject(DiseaseGroupManagementService) private readonly groupService: DiseaseGroupManagementService
  ) { }

  async create({ group, ...data }: PostDiseaseRequestDto): Promise<Disease> {
    const diseaseGroup = await this.groupService.findOne(group);
    const value = await this.repository.create({ ...data, group: diseaseGroup });
    return { ...value, group };
  }

  async findOne(id: number): Promise<Disease> {
    const diseases = await this.repository.findOne({
      where: { id, status: true },
      select: {
        id: true,
        name: true,
        group: { id: true, name: true }
      },
      relations: { group: true }
    });
    return { ...diseases, group: diseases.group.id };
  }

  async updateOne(id: number, { group, ...data }: PatchDiseaseRequestDto): Promise<Disease> {
    let currentGroup = undefined;
    if (group) {
      currentGroup = await this.groupService.findOne(group);
    }
    await this.repository.findOneAndUpdate({ id }, { ...data, group: currentGroup });
    const disease = await this.repository.findOne({ where: { id }, relations: { group: true } });
    return { ...disease, group: disease.group.id };
  }

  async deleteOne(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
