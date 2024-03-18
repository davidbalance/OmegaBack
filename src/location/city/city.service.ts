import { Inject, Injectable } from '@nestjs/common';
import { CityRepository } from './city.repository';
import { City } from './entities/city.entity';
import { CreateCityRequestDTO, UpdateCityRequestDTO } from './dto';
import { StateService } from '../state/state.service';

@Injectable()
export class CityService {

  constructor(
    @Inject(CityRepository) private readonly repository: CityRepository,
    @Inject(StateService) private readonly stateService: StateService
  ) { }

  async create(createCityDto: CreateCityRequestDTO): Promise<City> {
    const state = await this.readOneByID(createCityDto.state);
    return await this.repository.create({ ...createCityDto, state: state });
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
