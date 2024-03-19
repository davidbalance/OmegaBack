import { Inject, Injectable } from '@nestjs/common';
import { CityRepository } from './city.repository';
import { City } from './entities/city.entity';
import { CreateCityRequestDTO, UpdateCityRequestDTO } from '@/shared';

@Injectable()
export class CityService {

  constructor(
    @Inject(CityRepository) private readonly repository: CityRepository,
  ) { }

  async create(createCityDto: CreateCityRequestDTO): Promise<City> {
    return await this.repository.create({ ...createCityDto });
  }

  async findAll(): Promise<City[]> {
    return await this.repository.find({});
  }

  async findOneByID(id: number): Promise<City> {
    return await this.repository.findOne({ id });
  }

  async update(id: number, updateCityDto: UpdateCityRequestDTO): Promise<City> {
    return await this.repository.findOneAndUpdate({ id }, updateCityDto);
  }
}
