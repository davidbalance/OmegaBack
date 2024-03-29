import { Inject, Injectable } from '@nestjs/common';
import { BranchRepository } from './branch.repository';
import { SelectorOption } from '@/shared';

@Injectable()
export class BranchService {

  constructor(
    @Inject(BranchRepository) private readonly repository: BranchRepository
  ) { }

  async findSelectorOptions(): Promise<SelectorOption<number>[]> {
    const branches = await this.repository.find({ select: { name: true, id: true } });
    const options = branches.map((e) => ({
      key: e.id,
      label: e.name
    } as SelectorOption<number>));
    return options;
  }
}
