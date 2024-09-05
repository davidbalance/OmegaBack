import { Inject, Injectable } from '@nestjs/common';
import { DiseaseGroupRepository } from '../repository/disease-group.repository';
import { DiseaseGroup } from '../entities/disease-group.entity';
import { DiseaseGroupSingleResponseDto } from '../dtos/response/base.disease-group-single.response.dto';
import { BasePaginationService } from '@/shared/utils/bases/base.pagination.service';
import { SelectQueryBuilder } from 'typeorm';

@Injectable()
export class DiseaseGroupPaginationService extends BasePaginationService<DiseaseGroup, DiseaseGroupSingleResponseDto> {

  constructor(
    @Inject(DiseaseGroupRepository) private readonly repository: DiseaseGroupRepository,
  ) { super(); }

  protected queryBuilder(filter: string, extras?: any | undefined): SelectQueryBuilder<DiseaseGroup> {
    return this.repository.query('group')
      .select('group.id', 'id')
      .addSelect('group.name', 'name')
      .where('group.name LIKE :name', { name: `%${filter}%` })
      .andWhere('group.status = 1');
  }

}