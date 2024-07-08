import { Inject, Injectable } from '@nestjs/common';
import { DiseaseGroupRepository } from '../disease-group.repository';
import { DiseaseGroup } from '../entities/disease-group.entity';
import { PATCHDiseaseGroupRequestDto, POSTDiseaseGroupRequestDto } from '../dtos/disease-group.request.dto';

@Injectable()
export class DiseaseGroupService {

  constructor(
    @Inject(DiseaseGroupRepository) private readonly repository: DiseaseGroupRepository
  ) { }

  /**
   * Crea grupos de morbilidades.
   * @param group 
   * @returns 
   */
  async create(group: POSTDiseaseGroupRequestDto): Promise<DiseaseGroup> {
    return await this.repository.create(group);
  }

  /**
   * Encuentra todos los grupos de morbilidades que se encuentren activos.
   * @returns 
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
   * Encuentra un grupo de mobilidades por identificador unico.
   * @param id 
   * @returns 
   */
  async findOneById(id: number): Promise<DiseaseGroup> {
    return await this.repository.findOne({ where: { id } });
  }

  /**
   * Encuentra un grupo de morbilidades y lo modifica.
   * @param id 
   * @param update 
   * @returns 
   */
  async findOneAndUpdate(id: number, update: PATCHDiseaseGroupRequestDto): Promise<DiseaseGroup> {
    return await this.repository.findOneAndUpdate({ id }, update);
  }

  /**
   * Encuentra un grupo de morbilidades y lo elimina si no tiene morbilidades asociadas.
   * @param id 
   */
  async findOneAndDelete(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
