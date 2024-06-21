import { Inject, Injectable } from '@nestjs/common';
import { DiseaseRepository } from '../disease.repository';
import { Disease } from '../entities/disease.entity';
import { PATCHDiseaseRequestDto, POSTDiseaseRequestDto } from '../dtos/disease.request.dto';
import { DiseaseGroupService } from '@/disease/disease-group/services/disease-group.service';

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
  async create({ group, ...data }: POSTDiseaseRequestDto): Promise<Disease> {
    const diseaseGroup = await this.groupService.findOneById(group);
    return await this.repository.create({ ...data, group: diseaseGroup });
  }

  /**
   * Finds all the active diseases
   * @returns {Disease[]} Array of Disease objects
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
   * Finds one disease and update its data with the given value
   * @param id 
   * @param param1 
   * @returns Disease
   */
  async findOneAndUpdate(id: number, { group, ...data }: PATCHDiseaseRequestDto): Promise<Disease> {
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
