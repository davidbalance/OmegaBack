import { Inject, Injectable } from '@nestjs/common';
import { CorporativeGroupRepository } from './corporative-group.repository';
import { CorporativeGroup } from './entities/corporative-group.entity';
import { SelectorOption } from '@/shared';

@Injectable()
export class CorporativeGroupService {

  constructor(
    @Inject(CorporativeGroupRepository) private readonly repository: CorporativeGroupRepository
  ) { }

  async find(): Promise<CorporativeGroup[]> {
    const groups = await this.repository.find({
      where: {
        status: true
      }
    });

    return groups;
  }

  async findSelectorOptions(): Promise<SelectorOption<number>[]> {
    const groups = await this.repository.find({ select: { id: true, name: true } });
    const options = groups.map((e) => ({
      key: e.id,
      label: e.name
    } as SelectorOption<number>));
    return options;
  }

}
