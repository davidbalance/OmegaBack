import { Inject, Injectable } from '@nestjs/common';
import { CreateMorbidityDto } from './dto/create-morbidity.dto';
import { UpdateMorbidityDto } from './dto/update-morbidity.dto';
import { MorbidityRepository } from './morbidity.repository';
import { Morbidity } from './entities/morbidity.entity';
import { find } from 'rxjs';

@Injectable()
export class MorbidityService {

  constructor(
    @Inject(MorbidityRepository) private readonly repository: MorbidityRepository
  ) { }

  async create(createMorbidityDto: CreateMorbidityDto): Promise<Morbidity> {
    return await this.repository.create(createMorbidityDto);
  }

  async readAll(): Promise<Morbidity[]> {
    return await this.repository.find({ status: true });
  }

  async readOneByID(id: number): Promise<Morbidity> {
    return await this.repository.findOne({ id });
  }

  async update(id: number, updateMorbidityDto: UpdateMorbidityDto): Promise<Morbidity> {
    return await this.repository.findOneAndUpdate({ id }, updateMorbidityDto);
  }

  async remove(id: number): Promise<void> {
    await this.repository.findOneAndUpdate({ id }, { status: false });
  }
}
