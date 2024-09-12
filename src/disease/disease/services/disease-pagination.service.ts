import { Inject, Injectable } from '@nestjs/common';
import { DiseaseRepository } from '../repositories/disease.repository';
import { BasePaginationService } from '@/shared/utils/bases/base.pagination.service';
import { SelectQueryBuilder } from 'typeorm';
import { DiseaseEntity } from '../entities/disease.entity';
import { Disease } from '../dtos/response/disease.base.dto';

@Injectable()
export class DiseasePaginationService extends BasePaginationService<DiseaseEntity, Disease> {

  constructor(
    @Inject(DiseaseRepository) private readonly repository: DiseaseRepository,
  ) { super(); }

  protected queryBuilder(filter: string, extras: number): SelectQueryBuilder<DiseaseEntity> {
    return this.repository.query('disease')
      .innerJoinAndSelect('disease.group', 'group', 'group.id = :group', { group: extras })
      .select('disease.id', 'id')
      .addSelect('disease.name', 'name')
      .addSelect('group.id', 'group')
      .where('disease.name LIKE :name', { name: `%${filter}%` })
      .andWhere('disease.status = 1');
  }
}
