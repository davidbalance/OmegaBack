import { Inject, Injectable } from '@nestjs/common';
import { SelectorOption } from '@/shared';
import { CompanyRepository } from '../company.repository';
import { Company } from '../entities/company.entity';

@Injectable()
export class SelectorService {

  constructor(
    @Inject(CompanyRepository) private readonly repository: CompanyRepository
  ) { }

  async find(group: number): Promise<SelectorOption<number>[]> {
    const companies = await this.repository.createQuery('company')
      .select('company.id', 'key')
      .addSelect('company.name', 'label')
      .leftJoinAndSelect('company.group', 'group', 'group.id = :groupId', { groupId: group })
      .where('group.status = :status', { status: true })
      .getRawMany<SelectorOption<number>>();
    return companies;
  }
}
