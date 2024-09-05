import { Inject, Injectable } from '@nestjs/common';
import { ExamSubtypeRepository } from '../repositories/exam-subtype.repository';
import { ExamSubtype } from '../entities/exam-subtype.entity';
import { BasePaginationService } from '@/shared/utils/bases/base.pagination.service';
import { ExamTypeSingleResponseDto } from '@/laboratory/exam-type/dtos/response/base.exam-type-single.dto';
import { SelectQueryBuilder } from 'typeorm';

@Injectable()
export class ExamSubtypePaginationService extends BasePaginationService<ExamSubtype, ExamTypeSingleResponseDto> {

  constructor(
    @Inject(ExamSubtypeRepository) private readonly repository: ExamSubtypeRepository,
  ) { super(); }

  protected queryBuilder(filter: string, extras: number): SelectQueryBuilder<ExamSubtype> {
    return this.repository.query('subtype')
      .innerJoin('subtype.type', 'type', 'type.id = :type', { type: extras })
      .select('subtype.id', 'id')
      .addSelect('subtype.name', 'name')
      .where('subtype.name LIKE :name', { name: `%${filter}%` })
  }
}
