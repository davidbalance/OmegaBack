import { Inject, Injectable } from '@nestjs/common';
import { Disease } from '../entities/disease.entity';
import { DiseaseRepository } from '../repositories/disease.repository';
import { BasePaginationService } from '@/shared/utils/bases/base.pagination.service';
import { DiseaseResponseDto } from '../dtos/response/disease.response.dto';
import { SelectQueryBuilder } from 'typeorm';

@Injectable()
export class DiseasePaginationService extends BasePaginationService<Disease, DiseaseResponseDto> {

  constructor(
    @Inject(DiseaseRepository) private readonly repository: DiseaseRepository,
  ) { super(); }

  protected queryBuilder(filter: string, extras: number): SelectQueryBuilder<Disease> {
    return this.repository.query('disease')
      .innerJoinAndSelect('disease.group', 'group', 'group.id = :group', { group: extras })
      .select('disease.id', 'id')
      .addSelect('disease.name', 'name')
      .addSelect('group.id', 'group')
      .where('disease.name LIKE :name', { name: `%${filter}%` })
      .andWhere('disease.status = 1');
  }
}
