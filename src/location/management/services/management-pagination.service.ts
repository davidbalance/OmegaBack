import { Inject, Injectable } from '@nestjs/common';
import { Management } from '../entities/management.entity';
import { ManagementRepository } from '../repositories/management.repository';
import { BasePaginationService } from '@/shared/utils/bases/base.pagination.service';
import { ManagementResponseDto } from '../dtos/response/base.management.response.dto';
import { SelectQueryBuilder } from 'typeorm';

@Injectable()
export class ManagementPaginationService extends BasePaginationService<Management, ManagementResponseDto> {

  constructor(
    @Inject(ManagementRepository) private readonly repository: ManagementRepository
  ) { super(); }

  protected queryBuilder(filter: string): SelectQueryBuilder<Management> {
    return this.repository.query('management')
      .select('management.id', 'id')
      .addSelect('management.name', 'name')
      .where('management.name LIKE :name', { name: `%${filter}%` })
  }


}
