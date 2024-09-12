import { Inject, Injectable } from '@nestjs/common';
import { CompanyRepository } from '../repositories/company.repository';
import { BasePaginationService } from '@/shared/utils/bases/base.pagination.service';
import { SelectQueryBuilder } from 'typeorm';
import { CompanyEntity } from '../entities/company.entity';
import { Company } from '../dtos/response/company.base.dto';

@Injectable()
export class CompanyPaginationService extends BasePaginationService<CompanyEntity, Company> {

  constructor(
    @Inject(CompanyRepository) private readonly repository: CompanyRepository
  ) { super(); }

  protected queryBuilder(filter: string, extras: number): SelectQueryBuilder<CompanyEntity> {
    return this.repository.query('company')
      .innerJoin('company.corporativeGroup', 'corporativeGroup', 'corporativeGroup.id = :corporativeGroup', { corporativeGroup: extras })
      .select('company.id', 'id')
      .addSelect('company.ruc', 'ruc')
      .addSelect('company.name', 'name')
      .addSelect('company.address', 'address')
      .addSelect('company.phone', 'phone')
      .where('company.name LIKE :name', { name: `%${filter}%` })
      .orWhere('company.ruc LIKE :ruc', { ruc: `%${filter}%` })
  }
}
