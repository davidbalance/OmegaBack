import { Inject, Injectable } from '@nestjs/common';
import { CityRepository } from '../city.repository';
import { City } from '../entities/city.entity';

@Injectable()
export class CityService {

  constructor(
    @Inject(CityRepository) private readonly repository: CityRepository,
  ) { }

  /**
   * Retorna todas las ciudades del sistema.
   * @returns 
   */
  async find(): Promise<City[]> {
    const cities = await this.repository.find({ select: { id: true, name: true } });
    return cities;
  }

  /**
   * Retorna una ciudad e base a su identificador unico.
   * @param id 
   * @returns 
   */
  async findOne(id: number): Promise<City> {
    const city = await this.repository.findOne({ where: { id: id } });
    return city;
  }

  /**
   * Retorna una ciudad en base a su nombre.
   * @param name 
   * @returns 
   */
  async findOneByName(name: string): Promise<City> {
    const city = await this.repository.findOne({ where: { name: name } });
    return city;
  }
}
