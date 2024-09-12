import { Inject, Injectable } from '@nestjs/common';
import { JobPositionRepository } from '../repositories/job-position.repository';
import { SelectQueryBuilder } from 'typeorm';
import { BasePaginationService } from '@/shared/utils/bases/base.pagination.service';
import { JobPositionEntity } from '../entities/job-position.entity';
import { JobPosition } from '../dtos/response/job-position.base.dto';

@Injectable()
export class JobPositionPaginationService extends BasePaginationService<JobPositionEntity, JobPosition> {

  constructor(
    @Inject(JobPositionRepository) private readonly repository: JobPositionRepository
  ) { super(); }

  protected queryBuilder(filter: string): SelectQueryBuilder<JobPositionEntity> {
    return this.repository.query('jobposition')
      .select('jobposition.id', 'id')
      .addSelect('jobposition.name', 'name')
      .where('jobposition.name LIKE :name', { name: `%${filter}%` })
  }
}
