import { Inject, Injectable } from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { Company } from './entities/company.entity';
import { CorporativeGroupService } from '../corporative-group/corporative-group.service';
import { SelectorOption } from '@/shared';

type FindCompanyParams = Omit<Company, 'id' | 'status' | 'corporativeGroup' | 'branches'>;

@Injectable()
export class CompanyService {

  constructor(
    @Inject(CompanyRepository) private readonly repository: CompanyRepository
  ) { }

  async findSelectorOptions(): Promise<SelectorOption<number>[]> {
    const companies = await this.repository.find({ select: { id: true, name: true } });
    const options = companies.map((e) => ({
      key: e.id,
      label: e.name
    } as SelectorOption<number>));
    return options;
  }
}
