import { Inject, Injectable } from '@nestjs/common';
import { ExamSubtypeRepository } from '../repositories/exam-subtype.repository';
import { BasePaginationService } from '@/shared/utils/bases/base.pagination.service';
import { SelectQueryBuilder } from 'typeorm';
import { ExamSubtypeEntity } from '../entities/exam-subtype.entity';
import { ExamSubtype } from '../dtos/response/exam-subtype.base.dto';

@Injectable()
export class ExamSubtypePaginationService extends BasePaginationService<ExamSubtypeEntity, ExamSubtype> {

  constructor(
    @Inject(ExamSubtypeRepository) private readonly repository: ExamSubtypeRepository,
  ) { super(); }

  protected queryBuilder(filter: string, extras: number): SelectQueryBuilder<ExamSubtypeEntity> {
    return this.repository.query('subtype')
      .innerJoinAndSelect('subtype.type', 'type', 'type.id = :type', { type: extras })
      .select('subtype.id', 'id')
      .addSelect('subtype.name', 'name')
      .addSelect('type.id', 'type')
      .where('subtype.name LIKE :name', { name: `%${filter}%` })
  }
}
