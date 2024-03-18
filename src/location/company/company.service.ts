import { Inject, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyRepository } from './company.repository';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {

  constructor(
    @Inject(CompanyRepository) private readonly repository: CompanyRepository
  ) { }

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    return await this.repository.create(createCompanyDto);
  }

  async readAll(): Promise<Company[]> {
    return await this.repository.find({ status: true });
  }

  async readOneByID(id: number): Promise<Company> {
    return await this.repository.findOne({ status: false });
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    return await this.repository.findOneAndUpdate({ id }, updateCompanyDto);
  }

  async inactive(id: number): Promise<Company> {
    return await this.repository.findOneAndUpdateStatus(id, false);
  }
}
