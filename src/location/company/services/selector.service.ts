import { Inject, Injectable } from '@nestjs/common';
import { CompanyRepository } from '../company.repository';
import { ISelectorOption, ISelectorOptionService } from '@/shared/utils/bases/base.selector';

@Injectable()
export class SelectorService implements ISelectorOptionService<number> {

  constructor(
    @Inject(CompanyRepository) private readonly repository: CompanyRepository
  ) { }

  async find(group: number): Promise<ISelectorOption<number>[]> {
    const companies = await this.repository.query('company')
      .select('company.id', 'key')
      .addSelect('company.name', 'label')
      .leftJoinAndSelect('company.group', 'group', 'group.id = :groupId', { groupId: group })
      .where('group.status = :status', { status: true })
      .getRawMany<ISelectorOption<number>>();
    return companies;
  }

}
