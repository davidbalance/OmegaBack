import { Inject, Injectable } from '@nestjs/common';
import { CityRepository } from './city.repository';
import { SelectorOption } from '@/shared';
import { City } from './entities/city.entity';

@Injectable()
export class CityService {

  constructor(
    @Inject(CityRepository) private readonly repository: CityRepository,
  ) { }

  /**
   * Finds one city by its city code
   * @param id 
   * @returns 
   */
  async findOne(id: string): Promise<City> {
    const city = await this.repository.findOne({ where: { id: id } });
    return city;
  }

  /**
   * Find all the cities
   * @returns Array of City
   */
  async find(): Promise<City[]> {
    const cities = await this.repository.find({ select: { id: true, name: true } });
    return cities;
  }

  /**
   * Find all the cities and get only values for label and key
   * @returns Array of SelectorOption
   */
  async findSelectorOptions(): Promise<SelectorOption<string>[]> {
    const cities = await this.repository.find({ select: { id: true, name: true } });
    const options = cities.map((e) => ({
      key: e.id,
      label: e.name
    } as SelectorOption<string>));
    return options;
  }

}
