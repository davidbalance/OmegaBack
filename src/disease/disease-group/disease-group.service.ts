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

  /**
   * Creates a new disease group with the given options
   * @param group 
   * @returns DiseaseGroup
   */
  async create(group: CreateDiseaseGroupRequestDTO): Promise<DiseaseGroup> {
    return await this.repository.create(group);
  }

  /**
   * Finds all the active disease groups
   * @returns Array of DiseaseGroup
   */
  async find(): Promise<DiseaseGroup[]> {
    return this.repository.createQuery('group')
      .leftJoinAndSelect('group.diseases', 'disease', 'disease.status = :diseaseStatus', { diseaseStatus: true })
      .select(['group.id', 'group.name', 'disease.id', 'disease.name'])
      .cache('disease-group-find-all-cache', 1000 * 60 * 15)
      .where('group.status = :status', { status: true })
      .getMany();
  }

  /**
   * Find one group that matches with its id
   * @param id 
   * @returns DiseaseGroup
   */
  async findOneById(id: number): Promise<DiseaseGroup> {
    return await this.repository.findOne({ where: { id } });
  }

  /**
   * Find all the active disease groups and get only values for label and key
   * @returns Array of SelectorOption
   */
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

  /**
   * Finds one disease group and update its data with the given value
   * @param id 
   * @param update 
   * @returns DiseaseGroup
   */
  async findOneAndUpdate(id: number, update: FindOneDiseaseGroupAndUpdateRequestDTO): Promise<DiseaseGroup> {
    return await this.repository.findOneAndUpdate({ id }, update);
  }

  /**
   * Finds one disease group and change its state to inactive
   * @param id 
   */
  async findOneAndDelete(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
