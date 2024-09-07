import { Inject, Injectable } from '@nestjs/common';
import { CorporativeGroupRepository } from '../repositories/corporative-group.repository';
import { SelectQueryBuilder } from 'typeorm';
import { CorporativeGroupEntity } from '../entities/corporative-group.entity';
import { CorporativeGroup } from '../dtos/response/corporative-group.base.dto';
import { BasePaginationService } from '@/shared/utils/bases/base.pagination.service';
import { ExtendedCorporativeGroup } from '../dtos/response/extended-corporative-group.base.dto';

@Injectable()
export class CorporativeGroupOptionService {

  constructor(
    @Inject(CorporativeGroupRepository) private readonly repository: CorporativeGroupRepository
  ) { }

  public async find(): Promise<ExtendedCorporativeGroup[]> {
    const groups = await this.repository.find();
    return groups;
  }
}
