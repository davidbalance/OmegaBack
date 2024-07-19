import { Inject, Injectable } from '@nestjs/common';
import { CorporativeGroupRepository } from '../repositories/corporative-group.repository';
import { CorporativeGroup } from '../entities/corporative-group.entity';

@Injectable()
export class CorporativeGroupManagementService {

  constructor(
    @Inject(CorporativeGroupRepository) private readonly repository: CorporativeGroupRepository
  ) { }

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
}
