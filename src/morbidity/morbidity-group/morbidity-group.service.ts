import { Injectable } from '@nestjs/common';
import { CreateMorbidityGroupDto } from './dto/create-morbidity-group.dto';
import { UpdateMorbidityGroupDto } from './dto/update-morbidity-group.dto';

@Injectable()
export class MorbidityGroupService {
  create(createMorbidityGroupDto: CreateMorbidityGroupDto) {
    return 'This action adds a new morbidityGroup';
  }

  findAll() {
    return `This action returns all morbidityGroup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} morbidityGroup`;
  }

  update(id: number, updateMorbidityGroupDto: UpdateMorbidityGroupDto) {
    return `This action updates a #${id} morbidityGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} morbidityGroup`;
  }
}
