import { Inject, Injectable } from '@nestjs/common';
import { CreateMorbidityGroupDto } from './dto/create-morbidity-group.dto';
import { UpdateMorbidityGroupDto } from './dto/update-morbidity-group.dto';
import { MorbidityGroupRepository } from './morbidity-group.repository';
import { MorbidityGroup } from './entities/morbidity-group.entity';

@Injectable()
export class MorbidityGroupService {

  constructor(
    @Inject(MorbidityGroupRepository) private readonly repository: MorbidityGroupRepository
  ) { }

  async create(createMorbidityGroupDto: CreateMorbidityGroupDto): Promise<MorbidityGroup> {
    return await this.repository.create(createMorbidityGroupDto);
  }

  async readAll(): Promise<MorbidityGroup[]> {
    return await this.repository.find({ status: true });
  }

  async readOneByID(id: number): Promise<MorbidityGroup> {
    return await this.repository.findOne({ id });
  }

  async update(id: number, updateMorbidityGroupDto: UpdateMorbidityGroupDto): Promise<MorbidityGroup> {
    return await this.repository.findOneAndUpdate({ id }, updateMorbidityGroupDto);
  }

  async remove(id: number): Promise<void> {
    await this.repository.findOneAndUpdate({ id }, { status: false });
  }
}
