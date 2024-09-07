import { Inject, Injectable } from '@nestjs/common';
import { DiseaseGroupRepository } from '../repository/disease-group.repository';
import { ExtendedDiseaseGroup } from '../dtos/response/extended-disease-group.base.response.dto';

@Injectable()
export class DiseaseGroupOptionService {

  constructor(
    @Inject(DiseaseGroupRepository) private readonly repository: DiseaseGroupRepository
  ) { }

  async find(): Promise<ExtendedDiseaseGroup[]> {
    const groups = await this.repository.query('group')
      .leftJoinAndSelect('group.diseases', 'disease', 'disease.status = 1')
      .getMany();
    return groups;
  }
}
