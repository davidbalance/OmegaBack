import { Inject, Injectable } from '@nestjs/common';
import { ExamTypeRepository } from '../repositories/exam-type.repository';
import { ExamType } from '../entities/exam-type.entity';
import { BasePaginationService } from '@/shared/utils/bases/base.pagination.service';
import { SelectQueryBuilder } from 'typeorm';
import { ExamTypeSingleResponseDto } from '../dtos/response/base.exam-type-single.dto';

@Injectable()
export class ExamTypePaginationService extends BasePaginationService<ExamType, ExamTypeSingleResponseDto> {

  constructor(
    @Inject(ExamTypeRepository) private readonly repository: ExamTypeRepository,
  ) { super(); }

  protected queryBuilder(filter: string): SelectQueryBuilder<ExamType> {
    return this.repository.query('type')
      .select('type.id', 'id')
      .addSelect('type.name', 'name')
      .where('type.name LIKE :name', { name: `%${filter}%` })
  }
}