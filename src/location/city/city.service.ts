import { Inject, Injectable } from '@nestjs/common';
import { CityRepository } from './city.repository';
import { City } from './entities/city.entity';
import { CreateCityRequestDTO, UpdateCityRequestDTO } from '@/shared';

type FindCityParams = Omit<City, 'id' | 'branches'>;

@Injectable()
export class CityService {

  constructor(
    @Inject(CityRepository) private readonly repository: CityRepository,
  ) { }

  async create(createCity: CreateCityRequestDTO): Promise<City> {
    return await this.repository.create({ ...createCity });
  }

  async find(params?: Partial<FindCityParams>): Promise<City[]> {
    return await this.repository.find({});
  }

  async findOne(params?: Partial<FindCityParams & { id: number }>): Promise<City> {
    return await this.repository.findOne({ ...params });
  }

  async update(id: number, updateCityDto: UpdateCityRequestDTO): Promise<City> {
    return await this.repository.findOneAndUpdate({ id }, updateCityDto);
  }
}
