import { Inject, Injectable } from '@nestjs/common';
import { DiseaseGroupRepository } from '../repository/disease-group.repository';
import { PostDiseaseGroupRequestDto } from '../dtos/request/disease-group.post.request.dto';
import { PatchDiseaseGroupRequestDto } from '../dtos/request/disease-group.patch.request.dto';
import { DiseaseGroup } from '../dtos/response/disease-group.base.response.dto';

@Injectable()
export class DiseaseGroupManagementService {

  constructor(
    @Inject(DiseaseGroupRepository) private readonly repository: DiseaseGroupRepository
  ) { }

  async create(group: PostDiseaseGroupRequestDto): Promise<DiseaseGroup> {
    return await this.repository.create(group);
  }

  async findOne(id: number): Promise<DiseaseGroup> {
    return await this.repository.findOne({ where: { id } });
  }

  async hasDiseases(id: number): Promise<boolean> {
    const value = await this.repository.findOne({ where: { id }, relations: { diseases: true } });
    return value.diseases.filter(e => e.status).length > 0;
  }

  async updateOne(id: number, update: PatchDiseaseGroupRequestDto): Promise<DiseaseGroup> {
    return await this.repository.findOneAndUpdate({ id }, update);
  }

  async deleteOne(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
