import { Inject, Injectable } from '@nestjs/common';
import { CityRepository } from '../repositories/city.repository';
import { SelectorOption, SelectorOptionService } from '@/shared/utils/bases/base.selector';

@Injectable()
export class CitySelectorService implements SelectorOptionService<number> {

  constructor(
    @Inject(CityRepository) private readonly repository: CityRepository,
  ) { }

  async find(params: any = null): Promise<SelectorOption<number>[]> {
    const diseases = await this.repository.query('city')
      .select('city.id', 'key')
      .addSelect('city.name', 'label')
      .getRawMany<SelectorOption<number>>();
    return diseases;
  }
}
