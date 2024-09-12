import { Inject, Injectable } from '@nestjs/common';
import { CorporativeGroupRepository } from '../repositories/corporative-group.repository';
import { SelectQueryBuilder } from 'typeorm';
import { CorporativeGroupEntity } from '../entities/corporative-group.entity';
import { CorporativeGroup } from '../dtos/response/corporative-group.base.dto';
import { BasePaginationService } from '@/shared/utils/bases/base.pagination.service';

@Injectable()
export class CorporativeGroupPaginationService extends BasePaginationService<CorporativeGroupEntity, CorporativeGroup> {

  constructor(
    @Inject(CorporativeGroupRepository) private readonly repository: CorporativeGroupRepository
  ) { super(); }

  protected queryBuilder(filter: string, extras?: any | undefined): SelectQueryBuilder<CorporativeGroupEntity> {
    return this.repository.query('group')
      .select('group.id', 'id')
      .addSelect('group.name', 'name')
      .where('group.name LIKE :name', { name: `%${filter}%` });
  }
}
