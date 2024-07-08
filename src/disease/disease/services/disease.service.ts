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
   * Crea morbilidades.
   * @param param0 
   * @returns 
   */
  async create({ group, ...data }: POSTDiseaseRequestDto): Promise<Disease> {
    const diseaseGroup = await this.groupService.findOneById(group);
    return await this.repository.create({ ...data, group: diseaseGroup });
  }

  /**
   * Encuentra todos las morbilidades activas.
   * @returns 
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
   * Encuentra una morbilidad y lo modifica.
   * @param id 
   * @param param1 
   * @returns 
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
   * Encuentra una morbilidad.
   * @param id 
   */
  async findOneAndDelete(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
