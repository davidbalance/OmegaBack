import { Injectable } from '@nestjs/common';
import { CreateMorbidityDto } from './dto/create-morbidity.dto';
import { UpdateMorbidityDto } from './dto/update-morbidity.dto';

@Injectable()
export class MorbidityService {
  create(createMorbidityDto: CreateMorbidityDto) {
    return 'This action adds a new morbidity';
  }

  findAll() {
    return `This action returns all morbidity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} morbidity`;
  }

  update(id: number, updateMorbidityDto: UpdateMorbidityDto) {
    return `This action updates a #${id} morbidity`;
  }

  remove(id: number) {
    return `This action removes a #${id} morbidity`;
  }
}
