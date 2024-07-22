import { Inject, Injectable } from '@nestjs/common';
import { CorporativeGroupRepository } from '../repositories/corporative-group.repository';
import { SelectorOption, SelectorOptionService } from '@/shared/utils/bases/base.selector';

@Injectable()
export class CorporativeGroupSelectorService implements SelectorOptionService<number> {

  constructor(
    @Inject(CorporativeGroupRepository) private readonly repository: CorporativeGroupRepository
  ) { }

  async find(params: any = null): Promise<SelectorOption<number>[]> {
    const group = await this.repository.query('group')
      .select('group.id', 'key')
      .addSelect('group.name', 'label')
      .where('group.status = :status', { status: true })
      .getRawMany<SelectorOption<number>>();
    return group;
  }
}
