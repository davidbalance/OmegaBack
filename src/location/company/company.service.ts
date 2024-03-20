import { Inject, Injectable } from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { Company } from './entities/company.entity';
import { CorporativeGroupService } from '../corporative-group/corporative-group.service';
import { CreateCompanyRequestDTO, UpdateCompanyRequestDTO, UpdateCompanyRUCRequestDTO, UpdateCompanyCorporativeGroupRequestDTO, IServiceCheckAvailability } from '@/shared';

type FindCompanyParams = Omit<Company, 'id' | 'status' | 'corporativeGroup' | 'branches'>;

@Injectable()
export class CompanyService {

  constructor(
    @Inject(CompanyRepository) private readonly repository: CompanyRepository,
    @Inject(CorporativeGroupService) private readonly corporativeGroupService: CorporativeGroupService
  ) { }

  async create(createCompany: CreateCompanyRequestDTO): Promise<Company> {
    const corporativeGroup = await this.corporativeGroupService.findOne({ id: createCompany.corporativeGroup });
    return await this.repository.create({ ...createCompany, corporativeGroup: corporativeGroup });
  }

  async find(params?: Partial<FindCompanyParams>): Promise<Company[]> {
    return await this.repository.find({ ...params, status: true });
  }

  async findOne(params?: Partial<FindCompanyParams & { id: number }>): Promise<Company> {
    return await this.repository.findOne({ ...params, status: false });
  }

  async update(id: number, updateCompanyDto: UpdateCompanyRequestDTO): Promise<Company> {
    return await this.repository.findOneAndUpdate({ id }, updateCompanyDto);
  }

  async updateRUC(id: number, updateRucDto: UpdateCompanyRUCRequestDTO): Promise<Company> {
    return await this.repository.findOneAndUpdate({ id }, { ruc: updateRucDto.ruc });
  }

  async updateCorporativeGroup(id: number, updateCorporativeGroup: UpdateCompanyCorporativeGroupRequestDTO): Promise<Company> {
    const corporativeGroup = await this.corporativeGroupService.findOne({ id: updateCorporativeGroup.corporativeGroup });
    return await this.repository.findOneAndUpdate({ id }, { corporativeGroup: corporativeGroup });
  }

  async inactive(id: number): Promise<Company> {
    return await this.repository.findOneAndUpdateStatus(id, false);
  }
}
