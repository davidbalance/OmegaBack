import { Inject, Injectable } from '@nestjs/common';
import { CityRepository } from '../city.repository';
import { ISelectorOption, ISelectorOptionService } from '@/shared/utils/bases/base.selector';

@Injectable()
export class SelectorService implements ISelectorOptionService<number> {

  constructor(
    @Inject(CityRepository) private readonly repository: CityRepository,
  ) { }

  async find(params: any = null): Promise<ISelectorOption<number>[]> {
    const diseases = await this.repository.query('city')
      .select('city.id', 'key')
      .addSelect('city.name', 'label')
      .getRawMany<ISelectorOption<number>>();
    return diseases;
  }
}
