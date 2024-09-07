import { Inject, Injectable } from '@nestjs/common';
import { CityRepository } from '../repositories/city.repository';
import { City } from '../dtos/response/city.base.dto';

@Injectable()
export class CityService {

  constructor(
    @Inject(CityRepository) private readonly repository: CityRepository,
  ) { }

  async find(): Promise<City[]> {
    const cities = await this.repository.find({ select: { id: true, name: true } });
    return cities;
  }

  async findOne(id: number): Promise<City> {
    const city = await this.repository.findOne({ where: { id: id } });
    return city;
  }

  async findOneByName(name: string): Promise<City> {
    const city = await this.repository.findOne({ where: { name: name } });
    return city;
  }
}
