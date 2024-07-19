import { Inject, Injectable } from '@nestjs/common';
import { Company } from '../entities/company.entity';
import { CompanyRepository } from '../repositories/company.repository';

@Injectable()
export class CompanyManagementService {

  constructor(
    @Inject(CompanyRepository) private readonly repository: CompanyRepository
  ) { }

  async find(group: number): Promise<Company[]> {
    const companies = await this.repository.find({
      select: {
        id: true,
        name: true,
        phone: true,
        ruc: true,
        address: true,
        corporativeGroup: { name: true }
      },
      where: {
        corporativeGroup: { id: group },
        status: true
      }
    });
    return companies;
  }

  async findOne(id: number): Promise<Company> {
    const company = await this.repository.findOne({ where: { id } });
    return company;
  }
}
