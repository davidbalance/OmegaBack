import { Inject, Injectable } from '@nestjs/common';
import { DiseaseGroupRepository } from '../repository/disease-group.repository';
import { DiseaseGroup } from '../entities/disease-group.entity';
import { PATCHDiseaseGroupRequestDto, POSTDiseaseGroupRequestDto } from '../dtos/disease-group.request.dto';

@Injectable()
export class DiseaseGroupManagementService {

  constructor(
    @Inject(DiseaseGroupRepository) private readonly repository: DiseaseGroupRepository
  ) { }

  async create(group: POSTDiseaseGroupRequestDto): Promise<DiseaseGroup> {
    return await this.repository.create(group);
  }

  async find(): Promise<DiseaseGroup[]> {
    return this.repository.query('group')
      .leftJoinAndSelect('group.diseases', 'disease', 'disease.status = :diseaseStatus', { diseaseStatus: true })
      .select(['group.id', 'group.name', 'disease.id', 'disease.name'])
      .cache('disease-group-find-all-cache', 1000 * 60 * 15)
      .where('group.status = :status', { status: true })
      .getMany();
  }

  async findOneById(id: number): Promise<DiseaseGroup> {
    return await this.repository.findOne({ where: { id } });
  }

  async updateOne(id: number, update: PATCHDiseaseGroupRequestDto): Promise<DiseaseGroup> {
    return await this.repository.findOneAndUpdate({ id }, update);
  }

  async deleteOne(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
