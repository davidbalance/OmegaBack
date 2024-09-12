import { Inject, Injectable } from '@nestjs/common';
import { DiseaseGroupRepository } from '../repository/disease-group.repository';
import { DiseaseGroupEntity } from '../entities/disease-group.entity';
import { BasePaginationService } from '@/shared/utils/bases/base.pagination.service';
import { SelectQueryBuilder } from 'typeorm';
import { DiseaseGroup } from '../dtos/response/disease-group.base.response.dto';

@Injectable()
export class DiseaseGroupPaginationService extends BasePaginationService<DiseaseGroupEntity, DiseaseGroup> {

  constructor(
    @Inject(DiseaseGroupRepository) private readonly repository: DiseaseGroupRepository,
  ) { super(); }

  protected queryBuilder(filter: string, extras?: any | undefined): SelectQueryBuilder<DiseaseGroupEntity> {
    return this.repository.query('group')
      .select('group.id', 'id')
      .addSelect('group.name', 'name')
      .where('group.name LIKE :name', { name: `%${filter}%` })
      .andWhere('group.status = 1');
  }

}