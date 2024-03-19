import { Inject, Injectable } from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { Company } from './entities/company.entity';
import { CorporativeGroupService } from '../corporative-group/corporative-group.service';
import { CreateCompanyRequestDTO, UpdateCompanyRequestDTO, UpdateCompanyRUCRequestDTO, UpdateCompanyCorporativeGroupRequestDTO } from '@/shared';

@Injectable()
export class CompanyService {

  constructor(
    @Inject(CompanyRepository) private readonly repository: CompanyRepository,
    @Inject(CorporativeGroupService) private readonly corporativeGroupService: CorporativeGroupService
  ) { }

  async create(createCompanyDto: CreateCompanyRequestDTO): Promise<Company> {
    const corporativeGroup = await this.corporativeGroupService.readOneByID(createCompanyDto.corporativeGroup);
    return await this.repository.create({ ...createCompanyDto, corporativeGroup: corporativeGroup });
  }

  async findAll(): Promise<Company[]> {
    return await this.repository.find({ status: true });
  }

  async findOneByID(id: number): Promise<Company> {
    return await this.repository.findOne({ id: id, status: false });
  }

  async update(id: number, updateCompanyDto: UpdateCompanyRequestDTO): Promise<Company> {
    return await this.repository.findOneAndUpdate({ id }, updateCompanyDto);
  }

  async updateRUC(id: number, updateRucDto: UpdateCompanyRUCRequestDTO): Promise<Company> {
    return await this.repository.findOneAndUpdate({ id }, { ruc: updateRucDto.ruc });
  }

  async updateCorporativeGroup(id: number, updateCorporativeGroupDto: UpdateCompanyCorporativeGroupRequestDTO): Promise<Company> {
    const corporativeGroup = await this.corporativeGroupService.readOneByID(updateCorporativeGroupDto.corporativeGroup);
    return await this.repository.findOneAndUpdate({ id }, { corporativeGroup: corporativeGroup });
  }

  async inactive(id: number): Promise<Company> {
    return await this.repository.findOneAndUpdateStatus(id, false);
  }
}
