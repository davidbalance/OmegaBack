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
   * Retorna todos los grupos corporativos activos del sistema.
   * @returns 
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
}
