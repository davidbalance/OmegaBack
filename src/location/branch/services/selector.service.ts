import { Inject, Injectable } from '@nestjs/common';
import { BranchRepository } from '../branch.repository';
import { ISelectorOption, ISelectorOptionService } from '@/shared/utils/bases/base.selector';

@Injectable()
export class SelectorService implements ISelectorOptionService<number> {

  constructor(
    @Inject(BranchRepository) private readonly repository: BranchRepository
  ) { }

  async find(company: number): Promise<ISelectorOption<number>[]> {
    const diseases = await this.repository.query('branch')
      .select('branch.id', 'key')
      .addSelect('branch.name', 'label')
      .leftJoinAndSelect('branch.company', 'company', 'company.id = :companyId', { companyId: company })
      .getRawMany<ISelectorOption<number>>();
    return diseases;
  }

}
