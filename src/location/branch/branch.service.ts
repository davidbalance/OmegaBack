import { Inject, Injectable } from '@nestjs/common';
import { BranchRepository } from './branch.repository';
import { Branch } from './entities/branch.entity';
import { CompanyService } from '../company/company.service';
import { CreateBranchRequestDTO, UpdateBranchCityRequestDTO, UpdateBranchCompanyRequestDTO, UpdateBranchRequestDTO } from '@/shared';
import { CityService } from '../city/city.service';

type FindBranchParams = Omit<Branch, 'id' | 'status' | 'company' | 'city'>;

@Injectable()
export class BranchService {

  constructor(
    @Inject(BranchRepository) private readonly repository: BranchRepository,
    @Inject(CompanyService) private readonly companyService: CompanyService,
    @Inject(CityService) private readonly cityService: CityService
  ) { }

  async create(createBranch: CreateBranchRequestDTO): Promise<Branch> {
    const company = await this.companyService.findOne({ id: createBranch.company });
    const city = await this.cityService.findOne({ id: createBranch.city });
    return await this.repository.create({
      ...createBranch,
      company: company,
      city: city
    });
  }

  async find(params?: Partial<FindBranchParams>): Promise<Branch[]> {
    return await this.repository.find({ ...params, status: true });
  }

  async findOne(params?: Partial<FindBranchParams & { id: number }>): Promise<Branch[]> {
    return await this.repository.find({ ...params, status: true });
  }

  async update(id: number, updateBranch: UpdateBranchRequestDTO): Promise<Branch> {
    return await this.repository.findOneAndUpdate({ id }, updateBranch);
  }

  async updateCompany(id: number, updateCompany: UpdateBranchCompanyRequestDTO): Promise<Branch> {
    const company = await this.companyService.findOne({ id: updateCompany.company });
    return await this.repository.findOneAndUpdate({ id }, { company: company });
  }

  async updateCity(id: number, updateCity: UpdateBranchCityRequestDTO): Promise<Branch> {
    const city = await this.cityService.findOne({ id: updateCity.city });
    return await this.repository.findOneAndUpdate({ id }, { city: city });
  }

  async inactive(id: number): Promise<void> {
    await this.repository.findOneAndUpdate({ id }, { status: false });
  }
}
