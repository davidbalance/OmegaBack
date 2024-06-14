import { Inject, Injectable } from '@nestjs/common';
import { CorporativeGroupRepository } from '../corporative-group.repository';
import { CorporativeGroup } from '../entities/corporative-group.entity';
import { SelectorOption } from '@/shared';

@Injectable()
export class CorporativeGroupService {

  constructor(
    @Inject(CorporativeGroupRepository) private readonly repository: CorporativeGroupRepository
  ) { }

  /**
   * Finds all the active corporative groups
   * @returns Array of CorporativeGroup
   */
  async find(): Promise<CorporativeGroup[]> {
    const groups = await this.repository.find({
      where: {
        status: true
      },
      relations: {
        companies: {
          branches: {
            city: true
          }
        }
      }
    });

    return groups;
  }

  /**
   * Find all the corporative groups and get only values for label and key
   * @returns Array of SelectorOption
   */
  async findSelectorOptions(): Promise<SelectorOption<number>[]> {
    const groups = await this.repository.find({ select: { id: true, name: true } });
    const options = groups.map((e) => ({
      key: e.id,
      label: e.name
    } as SelectorOption<number>));
    return options;
  }

}
