import { Inject, Injectable } from '@nestjs/common';
import { DiseaseRepository } from './disease.repository';
import { Disease } from './entities/disease.entity';
import { SelectorOption } from '@/shared';
import { DiseaseGroupService } from '../disease-group/disease-group.service';
import { CreateDiseaseRequestDTO, FindOneDiseaseAndUpdateRequestDTO } from './dtos';

@Injectable()
export class DiseaseService {

  constructor(
    @Inject(DiseaseRepository) private readonly repository: DiseaseRepository,
    @Inject(DiseaseGroupService) private readonly groupService: DiseaseGroupService
  ) { }

  async create({ group, ...data }: CreateDiseaseRequestDTO): Promise<Disease> {
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

  async findSelectorOptions(): Promise<SelectorOption<number>[]> {
    const diseases = await this.repository.find({
      where: { status: true },
      select: {
        id: true,
        name: true
      }
    });
    const options = await diseases.map((e) => ({
      key: e.id,
      label: e.name
    } as SelectorOption<number>));
    return options;
  }

  async findOneAndUpdate(id: number, { group, ...data }: FindOneDiseaseAndUpdateRequestDTO): Promise<Disease> {
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