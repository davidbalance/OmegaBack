import { Inject, Injectable } from '@nestjs/common';
import { ExamTypeRepository } from '../repositories/exam-type.repository';
import { ExamTypeEntity } from '../entities/exam-type.entity';
import { BasePaginationService } from '@/shared/utils/bases/base.pagination.service';
import { SelectQueryBuilder } from 'typeorm';
import { ExamType } from '../dtos/response/exam-type.base.dto';

@Injectable()
export class ExamTypePaginationService extends BasePaginationService<ExamTypeEntity, ExamType> {

  constructor(
    @Inject(ExamTypeRepository) private readonly repository: ExamTypeRepository,
  ) { super(); }

  protected queryBuilder(filter: string): SelectQueryBuilder<ExamTypeEntity> {
    return this.repository.query('type')
      .select('type.id', 'id')
      .addSelect('type.name', 'name')
      .where('type.name LIKE :name', { name: `%${filter}%` })
  }
}