import { Inject, Injectable } from '@nestjs/common';
import { DiseaseGroupRepository } from './disease-group.repository';
import { DiseaseGroup } from './entities/disease-group.entity';
import { CreateDiseaseGroupRequestDTO, FindOneDiseaseGroupAndUpdateRequestDTO } from './dtos';
import { SelectorOption } from '@/shared';

@Injectable()
export class DiseaseGroupService {

  constructor(
    @Inject(DiseaseGroupRepository) private readonly repository: DiseaseGroupRepository
  ) { }

  async create(group: CreateDiseaseGroupRequestDTO): Promise<DiseaseGroup> {
    return await this.repository.create(group);
  }

  async find(): Promise<DiseaseGroup[]> {
    return await this.repository.find({
      where: { status: true },
      select: {
        id: true,
        name: true
      },
      cache: {
        id: "disease-group-find-all-cache",
        milliseconds: 1000 * 60 * 15
      }
    });
  }

  async findOneById(id: number): Promise<DiseaseGroup> {
    return await this.repository.findOne({ where: { id } });
  }

  async findSelectorOptions(): Promise<SelectorOption<number>[]> {
    const groups = await this.repository.find({
      where: { status: true },
      select: {
        id: true,
        name: true
      },
      cache: {
        id: "disease-group-selector-options-cache",
        milliseconds: 1000 * 60 * 15
      }
    });
    const options = groups.map((e) => ({
      key: e.id,
      label: e.name
    } as SelectorOption<number>));
    return options;
  }

  async findOneAndUpdate(id: number, update: FindOneDiseaseGroupAndUpdateRequestDTO): Promise<DiseaseGroup> {
    return await this.repository.findOneAndUpdate({ id }, update);
  }

  async findOneAndDelete(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
