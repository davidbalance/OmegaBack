import { Inject, Injectable } from '@nestjs/common';
import { MorbidityRepository } from './morbidity.repository';
import { Morbidity } from './entities/morbidity.entity';
import { find } from 'rxjs';
import { CreateMorbidityRequestDTO, UpdateMorbidityRequestDTO } from '@/shared/dtos/morbidity.request.dto';

@Injectable()
export class MorbidityService {

  constructor(
    @Inject(MorbidityRepository) private readonly repository: MorbidityRepository
  ) { }

  async create(createMorbidityDto: CreateMorbidityRequestDTO): Promise<Morbidity> {
    return await this.repository.create(createMorbidityDto);
  }

  async findAll(): Promise<Morbidity[]> {
    return await this.repository.find({ status: true });
  }

  async findOneByID(id: number): Promise<Morbidity> {
    return await this.repository.findOne({ id });
  }

  async update(id: number, updateMorbidityDto: UpdateMorbidityRequestDTO): Promise<Morbidity> {
    return await this.repository.findOneAndUpdate({ id }, updateMorbidityDto);
  }

  async remove(id: number): Promise<void> {
    await this.repository.findOneAndUpdate({ id }, { status: false });
  }
}
