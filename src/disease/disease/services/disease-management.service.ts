import { Inject, Injectable } from '@nestjs/common';
import { Disease } from '../entities/disease.entity';
import { DiseaseGroupManagementService } from '@/disease/disease-group/services/disease-group-management.service';
import { DiseaseRepository } from '../repositories/disease.repository';
import { PostDiseaseRequestDto } from '../dtos/request/post.disease.request.dto';
import { PatchDiseaseRequestDto } from '../dtos/request/patch.disease.request.dto';
import { DiseaseResponseDto } from '../dtos/response/disease.response.dto';

@Injectable()
export class DiseaseManagementService {

  constructor(
    @Inject(DiseaseRepository) private readonly repository: DiseaseRepository,
    @Inject(DiseaseGroupManagementService) private readonly groupService: DiseaseGroupManagementService
  ) { }

  async create({ group, ...data }: PostDiseaseRequestDto): Promise<Disease> {
    const diseaseGroup = await this.groupService.findOneById(group);
    return await this.repository.create({ ...data, group: diseaseGroup });
  }

  async find(group: number): Promise<Disease[]> {
    const diseases = await this.repository.find({
      where: {
        group: { id: group },
        status: true
      },
      select: {
        id: true,
        name: true,
        group: { id: true, name: true }
      },
      relations: { group: true }
    });
    return diseases;
  }

  async findOne(id: number): Promise<DiseaseResponseDto> {
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
    if (group) {
      const diseaseGroup = await this.groupService.findOneById(group);
      return await this.repository.findOneAndUpdate({ id }, { ...data, group: diseaseGroup });
    } else {
      return await this.repository.findOneAndUpdate({ id }, { ...data });
    }
  }

  async deleteOne(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
