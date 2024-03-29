import { Inject, Injectable } from '@nestjs/common';
import { CorporativeGroupRepository } from './corporative-group.repository';
import { CorporativeGroup } from './entities/corporative-group.entity';
import { SelectorOption } from '@/shared';

type FindCorporativeGroupParams = Omit<CorporativeGroup, 'id' | 'status' | 'companies'>;

@Injectable()
export class CorporativeGroupService {

  constructor(
    @Inject(CorporativeGroupRepository) private readonly repository: CorporativeGroupRepository
  ) { }

  async findSelectorOptions(): Promise<SelectorOption<number>[]> {
    const groups = await this.repository.find({ select: { id: true, name: true } });
    const options = groups.map((e) => ({
      key: e.id,
      label: e.name
    } as SelectorOption<number>));
    return options;
  }

}
