import { Inject, Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { CityRepository } from './city.repository';
import { City } from './entities/city.entity';

@Injectable()
export class CityService {

  constructor(
    @Inject(CityRepository) private readonly repository: CityRepository
  ) { }

  async create(createCityDto: CreateCityDto): Promise<City> {
    return await this.repository.create(createCityDto);
  }

  async readAll(): Promise<City[]> {
    return await this.repository.find({});
  }

  async readOneByID(id: number): Promise<City> {
    return await this.repository.findOne({ id });
  }

  async update(id: number, updateCityDto: UpdateCityDto): Promise<City> {
    return await this.repository.findOneAndUpdate({ id }, updateCityDto);
  }
}
