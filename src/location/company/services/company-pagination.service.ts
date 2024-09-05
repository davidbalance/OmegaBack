import { Inject, Injectable } from '@nestjs/common';
import { Company } from '../entities/company.entity';
import { CompanyRepository } from '../repositories/company.repository';
import { BasePaginationService } from '@/shared/utils/bases/base.pagination.service';
import { CompanySingleResponseDto } from '../dtos/response/base.company-single.response.dto';
import { SelectQueryBuilder } from 'typeorm';

@Injectable()
export class CompanyPaginationService extends BasePaginationService<Company, CompanySingleResponseDto> {

  constructor(
    @Inject(CompanyRepository) private readonly repository: CompanyRepository
  ) { super(); }

  protected queryBuilder(filter: string, extras: number): SelectQueryBuilder<Company> {
    return this.repository.query('company')
      .innerJoin('company.corporativeGroup', 'corporativeGroup', 'corporativeGroup.id = :corporativeGroup', { corporativeGroup: extras })
      .select('company.id', 'id')
      .addSelect('company.name', 'name')
      .addSelect('company.ruc', 'ruc')
      .addSelect('company.phone', 'phone')
      .where('company.name LIKE :name', { name: `%${filter}%` })
      .orWhere('company.ruc LIKE :ruc', { ruc: `%${filter}%` })
  }
}
