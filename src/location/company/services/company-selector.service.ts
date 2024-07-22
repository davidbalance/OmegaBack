import { Inject, Injectable } from '@nestjs/common';
import { SelectorOption, SelectorOptionService } from '@/shared/utils/bases/base.selector';
import { CompanyRepository } from '../repositories/company.repository';

@Injectable()
export class CompanySelectorService implements SelectorOptionService<number> {

  constructor(
    @Inject(CompanyRepository) private readonly repository: CompanyRepository
  ) { }

  async find(group: number): Promise<SelectorOption<number>[]> {
    const companies = await this.repository.query('company')
      .select('company.id', 'key')
      .addSelect('company.name', 'label')
      .leftJoinAndSelect('company.group', 'group', 'group.id = :groupId', { groupId: group })
      .where('group.status = :status', { status: true })
      .getRawMany<SelectorOption<number>>();
    return companies;
  }

}
