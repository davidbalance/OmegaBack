import { Inject, Injectable } from '@nestjs/common';
import { Branch } from '../entities/branch.entity';
import { BranchRepository } from '../repositories/branch.repository';
import { BasePaginationService } from '@/shared/utils/bases/base.pagination.service';
import { SelectQueryBuilder } from 'typeorm';
import { BranchSingleResponseDto } from '../dtos/response/base.branch-single.response.dto';

@Injectable()
export class BranchPaginationService extends BasePaginationService<Branch, BranchSingleResponseDto> {

  constructor(
    @Inject(BranchRepository) private readonly repository: BranchRepository
  ) { super(); }

  protected queryBuilder(filter: string, extras: number): SelectQueryBuilder<Branch> {
    console.log(filter, extras);
    return this.repository.query('branch')
      .innerJoin('branch.company', 'company', 'company.id = :company', { company: extras })
      .innerJoinAndSelect('branch.city', 'city')
      .select('branch.id', 'id')
      .addSelect('branch.name', 'name')
      .addSelect('city.name', 'city')
      .where('branch.name LIKE :name', { name: `%${filter}%` })
  }
}
