import { Inject, Injectable } from '@nestjs/common';
import { ManagementEntity } from '../entities/management.entity';
import { ManagementRepository } from '../repositories/management.repository';
import { BasePaginationService } from '@/shared/utils/bases/base.pagination.service';
import { Management } from '../dtos/response/management.base.dto';
import { SelectQueryBuilder } from 'typeorm';

@Injectable()
export class ManagementPaginationService extends BasePaginationService<ManagementEntity, Management> {

  constructor(
    @Inject(ManagementRepository) private readonly repository: ManagementRepository
  ) { super(); }

  protected queryBuilder(filter: string): SelectQueryBuilder<ManagementEntity> {
    return this.repository.query('management')
      .select('management.id', 'id')
      .addSelect('management.name', 'name')
      .where('management.name LIKE :name', { name: `%${filter}%` })
  }
}
