import { Inject, Injectable } from '@nestjs/common';
import { JobPositionRepository } from '../repositories/job-position.repository';
import { JobPosition } from '../entities/job-position.entity';
import { JobPositionResponseDto } from '../dtos/response/base.job-position.dto';
import { SelectQueryBuilder } from 'typeorm';
import { BasePaginationService } from '@/shared/utils/bases/base.pagination.service';

@Injectable()
export class JobPositionPaginationService extends BasePaginationService<JobPosition, JobPositionResponseDto> {

  constructor(
    @Inject(JobPositionRepository) private readonly repository: JobPositionRepository
  ) { super(); }

  protected queryBuilder(filter: string): SelectQueryBuilder<JobPosition> {
    return this.repository.query('jobposition')
      .select('jobposition.id', 'id')
      .addSelect('jobposition.name', 'name')
      .where('jobposition.name LIKE :name', { name: `%${filter}%` })
  }
}
