import { Inject, Injectable } from '@nestjs/common';
import { CityRepository } from './city.repository';
import { SelectorOption } from '@/shared';

@Injectable()
export class CityService {

  constructor(
    @Inject(CityRepository) private readonly repository: CityRepository,
  ) { }

  async findSelectorOptions(): Promise<SelectorOption<string>[]> {
    const cities = await this.repository.find({ select: { id: true, name: true } });
    const options = cities.map((e) => ({
      key: e.id,
      label: e.name
    } as SelectorOption<string>));
    return options;
  }

}
