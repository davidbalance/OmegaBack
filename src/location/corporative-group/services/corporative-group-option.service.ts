import { Inject, Injectable } from '@nestjs/common';
import { CorporativeGroupRepository } from '../repositories/corporative-group.repository';
import { ExtendedCorporativeGroup } from '../dtos/response/extended-corporative-group.base.dto';

@Injectable()
export class CorporativeGroupOptionService {

  constructor(
    @Inject(CorporativeGroupRepository) private readonly repository: CorporativeGroupRepository
  ) { }

  public async find(): Promise<ExtendedCorporativeGroup[]> {
    const groups = await this.repository.find({ relations: { companies: { branches: true } } });
    return groups;
  }
}
