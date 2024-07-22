import { Inject, Injectable } from '@nestjs/common';
import { SelectorOption, SelectorOptionService } from '@/shared/utils/bases/base.selector';
import { BranchRepository } from '../repositories/branch.repository';

@Injectable()
export class BranchSelectorService implements SelectorOptionService<number> {

  constructor(
    @Inject(BranchRepository) private readonly repository: BranchRepository
  ) { }

  async find(company: number): Promise<SelectorOption<number>[]> {
    const diseases = await this.repository.query('branch')
      .select('branch.id', 'key')
      .addSelect('branch.name', 'label')
      .leftJoinAndSelect('branch.company', 'company', 'company.id = :companyId', { companyId: company })
      .getRawMany<SelectorOption<number>>();
    return diseases;
  }
}
