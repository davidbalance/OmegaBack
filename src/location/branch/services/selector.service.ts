import { Inject, Injectable } from '@nestjs/common';
import { SelectorOption } from '@/shared';
import { BranchRepository } from '../branch.repository';

@Injectable()
export class SelectorService {

  constructor(
    @Inject(BranchRepository) private readonly repository: BranchRepository
  ) { }

  async find(company: number): Promise<SelectorOption<number>[]> {
    const diseases = await this.repository.createQuery('branch')
      .select('branch.id', 'key')
      .addSelect('branch.name', 'label')
      .leftJoinAndSelect('branch.company', 'company', 'company.id = :companyId', { companyId: company })
      .getRawMany<SelectorOption<number>>();
    return diseases;
  }
}
