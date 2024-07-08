import { Inject, Injectable } from '@nestjs/common';
import { CompanyRepository } from '../company.repository';
import { Company } from '../entities/company.entity';

@Injectable()
export class CompanyService {

  constructor(
    @Inject(CompanyRepository) private readonly repository: CompanyRepository
  ) { }

  /**
   * Retorna todos las empresas activas del sistema.
   * @param group 
   * @returns 
   */
  async find(group: number): Promise<Company[]> {
    const companies = await this.repository.find({
      select: {
        id: true,
        name: true,
        phone: true,
        ruc: true,
        address: true,
        corporativeGroup: {
          name: true
        }
      },
      where: {
        corporativeGroup: {
          id: group
        },
        status: true
      }
    });
    return companies;
  }

  /**
   * Retorna una empresa.
   * @param group 
   * @returns 
   */
  async findOne(id: number): Promise<Company> {
    const company = await this.repository.findOne({ where: { id } });
    return company;
  }
}
