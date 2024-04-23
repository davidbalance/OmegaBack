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

  /**
   * Creates a new disease with the given options
   * @param param0 
   * @returns Disease
   */
  async create({ group, ...data }: CreateDiseaseRequestDTO): Promise<Disease> {
    const diseaseGroup = await this.groupService.findOneById(group);
    return await this.repository.create({ ...data, group: diseaseGroup });
  }

  /**
   * Finds all the active diseases
   * @returns Array of Disease
   */
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

  /**
   * Find all the active diseases and get only values for label and key
   * @returns Array of SelectorOption
   */
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

  /**
   * Finds one disease and update its data with the given value
   * @param id 
   * @param param1 
   * @returns Disease
   */
  async findOneAndUpdate(id: number, { group, ...data }: FindOneDiseaseAndUpdateRequestDTO): Promise<Disease> {
    if (group) {
      const diseaseGroup = await this.groupService.findOneById(group);
      return await this.repository.findOneAndUpdate({ id }, { ...data, group: diseaseGroup });
    } else {
      return await this.repository.findOneAndUpdate({ id }, { ...data });
    }
  }

  /**
   * Finds one disease and change its state to inactive
   * @param id 
   */
  async findOneAndDelete(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
