import { Inject, Injectable } from '@nestjs/common';
import { Disease } from '../entities/disease.entity';
import { PATCHDiseaseRequestDto, POSTDiseaseRequestDto } from '../dtos/disease.request.dto';
import { DiseaseGroupManagementService } from '@/disease/disease-group/services/disease-group-management.service';
import { DiseaseRepository } from '../repositories/disease.repository';

@Injectable()
export class DiseaseService {

  constructor(
    @Inject(DiseaseRepository) private readonly repository: DiseaseRepository,
    @Inject(DiseaseGroupManagementService) private readonly groupService: DiseaseGroupManagementService
  ) { }

  async create({ group, ...data }: POSTDiseaseRequestDto): Promise<Disease> {
    const diseaseGroup = await this.groupService.findOneById(group);
    return await this.repository.create({ ...data, group: diseaseGroup });
  }

  async find(): Promise<Disease[]> {
    const diseases = await this.repository.find({
      where: { status: true },
      select: {
        id: true,
        name: true,
        group: {
          id: true,
          name: true
        }
      },
      relations: {
        group: true
      }
    });
    return diseases;
  }

  async findOneAndUpdate(id: number, { group, ...data }: PATCHDiseaseRequestDto): Promise<Disease> {
    if (group) {
      const diseaseGroup = await this.groupService.findOneById(group);
      return await this.repository.findOneAndUpdate({ id }, { ...data, group: diseaseGroup });
    } else {
      return await this.repository.findOneAndUpdate({ id }, { ...data });
    }
  }

  async findOneAndDelete(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
