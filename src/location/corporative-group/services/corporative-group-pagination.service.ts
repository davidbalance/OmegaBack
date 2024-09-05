import { Inject, Injectable } from '@nestjs/common';
import { CorporativeGroupRepository } from '../repositories/corporative-group.repository';
import { CorporativeGroup } from '../entities/corporative-group.entity';
import { BasePaginationService } from '@/shared/utils/bases/base.pagination.service';
import { CorporativeGroupSingleResponseDto } from '../dtos/response/base.corporative-group-single.response.dto';
import { SelectQueryBuilder } from 'typeorm';

@Injectable()
export class CorporativeGroupPaginationService extends BasePaginationService<CorporativeGroup, CorporativeGroupSingleResponseDto> {

  constructor(
    @Inject(CorporativeGroupRepository) private readonly repository: CorporativeGroupRepository
  ) { super(); }

  protected queryBuilder(filter: string): SelectQueryBuilder<CorporativeGroup> {
    return this.repository.query('group')
      .select('group.id', 'id')
      .addSelect('group.name', 'name')
      .where('group.name LIKE :name', { name: `%${filter}%` })
  }
}
