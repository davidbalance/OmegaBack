import { Inject, Injectable } from '@nestjs/common';
import { CityRepository } from '../city.repository';
import { SelectorOption } from '@/shared';

@Injectable()
export class SelectorService {

  constructor(
    @Inject(CityRepository) private readonly repository: CityRepository,
  ) { }

  /**
   * Encuentra todas las ciudades y solo retorna un key y label.
   * @returns 
   */
  async find(): Promise<SelectorOption<number>[]> {
    const diseases = await this.repository.createQuery('city')
      .select('city.id', 'key')
      .addSelect('city.name', 'label')
      .getRawMany<SelectorOption<number>>();
    return diseases;
  }
}