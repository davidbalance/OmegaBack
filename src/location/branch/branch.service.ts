import { Inject, Injectable } from '@nestjs/common';
import { BranchRepository } from './branch.repository';
import { Branch } from './entities/branch.entity';
import { CreateBranchRequestDTO, UpdateBranchCompanyRequestDTO, UpdateBranchRequestDTO } from './dto';
import { CompanyService } from '../company/company.service';

@Injectable()
export class BranchService {

  constructor(
    @Inject(BranchRepository) private readonly repository: BranchRepository,
    @Inject(CompanyService) private readonly companyService: CompanyService
  ) { }

  async create(createBranchDto: CreateBranchRequestDTO): Promise<Branch> {
    const company = await this.companyService.readOneByID(createBranchDto.company);
    return await this.repository.create({ ...createBranchDto, company: company });
  }

  async readAll(): Promise<Branch[]> {
    return await this.repository.find({ status: true });
  }

  async readOneByID(id: number): Promise<Branch> {
    return await this.repository.findOne({ id });
  }

  async readOneByRUC(ruc: string): Promise<Branch> {
    return await this.repository.findOne({ company: { ruc: ruc } });
  }

  async update(id: number, updateBranchDto: UpdateBranchRequestDTO): Promise<Branch> {
    return await this.repository.findOneAndUpdate({ id }, updateBranchDto);
  }

  async updateCompany(id: number, updateCompanyDto: UpdateBranchCompanyRequestDTO): Promise<Branch> {
    const company = await this.companyService.readOneByID(updateCompanyDto.company);
    return await this.repository.findOneAndUpdate({ id }, { company: company });
  }

  async inactive(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
