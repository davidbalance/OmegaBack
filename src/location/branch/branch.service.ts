import { Inject, Injectable } from '@nestjs/common';
import { BranchRepository } from './branch.repository';
import { SelectorOption } from '@/shared';
import { Branch } from './entities/branch.entity';

@Injectable()
export class BranchService {

  constructor(
    @Inject(BranchRepository) private readonly repository: BranchRepository
  ) { }

  /**
   * Find all the active branches associated to a company
   * @param company 
   * @returns Array of Branch
   */
  async find(company: string): Promise<Branch[]> {
    const branches = await this.repository.find({
      where: {
        company: { ruc: company },
        status: true,
      },
      select: {
        id: true,
        name: true,
        city: { name: true },
        company: {
          corporativeGroup: {
            name: true
          },
          address: true,
          name: true,
          ruc: true,
          phone: true
        },
      }
    });
    return branches;
  }

  /**
   * Find all the branches and get only values for label and key
   * @returns Array of SelectorOption
   */
  async findSelectorOptions(): Promise<SelectorOption<number>[]> {
    const branches = await this.repository.find({ select: { name: true, id: true } });
    const options = branches.map((e) => ({
      key: e.id,
      label: e.name
    } as SelectorOption<number>));
    return options;
  }
}
