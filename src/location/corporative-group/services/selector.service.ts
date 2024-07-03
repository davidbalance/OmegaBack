import { Inject, Injectable } from '@nestjs/common';
import { CorporativeGroupRepository } from '../corporative-group.repository';
import { SelectorOption } from '@/shared';

@Injectable()
export class SelectorService {

  constructor(
    @Inject(CorporativeGroupRepository) private readonly repository: CorporativeGroupRepository
  ) { }

  /**
   * Encuentra todos los grupos corporativos activos y solo retorna un key y label.
   * @returns 
   */
  async find(): Promise<SelectorOption<number>[]> {
    const group = await this.repository.createQuery('group')
      .select('group.id', 'key')
      .addSelect('group.name', 'label')
      .where('group.status = :status', { status: true })
      .getRawMany<SelectorOption<number>>();
    return group;
  }
}
