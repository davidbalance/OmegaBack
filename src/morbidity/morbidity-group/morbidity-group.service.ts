import { Inject, Injectable } from '@nestjs/common';
import { MorbidityGroupRepository } from './morbidity-group.repository';
import { MorbidityGroup } from './entities/morbidity-group.entity';
import { CreateMorbidityGroupRequestDTO, UpdateMorbidityGroupRequestDTO } from '@/shared/dtos/morbidity-group.request.dto';

type FindMorbidityParams = Omit<MorbidityGroup, 'id' | 'status' | 'group' | 'results'>

@Injectable()
export class MorbidityGroupService {

  constructor(
    @Inject(MorbidityGroupRepository) private readonly repository: MorbidityGroupRepository
  ) { }

  async create(createMorbidityGroupDto: CreateMorbidityGroupRequestDTO): Promise<MorbidityGroup> {
    return await this.repository.create(createMorbidityGroupDto);
  }

  async find(params?: Partial<FindMorbidityParams>): Promise<MorbidityGroup[]> {
    return await this.repository.find({ ...params, status: true });
  }

  async findOne(params?: Partial<FindMorbidityParams & { id: number }>): Promise<MorbidityGroup> {
    return await this.repository.findOne(params);
  }

  async update(id: number, updateMorbidityGroupDto: UpdateMorbidityGroupRequestDTO): Promise<MorbidityGroup> {
    return await this.repository.findOneAndUpdate({ id }, updateMorbidityGroupDto);
  }

  async inactive(id: number): Promise<void> {
    await this.repository.findOneAndUpdate({ id }, { status: false });
  }
}
