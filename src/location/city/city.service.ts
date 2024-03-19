import { Inject, Injectable } from '@nestjs/common';
import { CityRepository } from './city.repository';
import { City } from './entities/city.entity';
import { CreateCityRequestDTO, UpdateCityRequestDTO } from './dto';

@Injectable()
export class CityService {

  constructor(
    @Inject(CityRepository) private readonly repository: CityRepository,
  ) { }

  async create(createCityDto: CreateCityRequestDTO): Promise<City> {
    return await this.repository.create({ ...createCityDto });
  }

  async readAll(): Promise<City[]> {
    return await this.repository.find({});
  }

  async readOneByID(id: number): Promise<City> {
    return await this.repository.findOne({ id });
  }

  async update(id: number, updateCityDto: UpdateCityRequestDTO): Promise<City> {
    return await this.repository.findOneAndUpdate({ id }, updateCityDto);
  }
}
