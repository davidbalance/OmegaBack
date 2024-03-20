import { Inject, Injectable } from '@nestjs/common';
import { MorbidityRepository } from './morbidity.repository';
import { Morbidity } from './entities/morbidity.entity';
import { CreateMorbidityRequestDTO, UpdateMorbidityRequestDTO } from '@/shared/dtos/morbidity.request.dto';
import { MorbidityGroupService } from '../morbidity-group/morbidity-group.service';

type FindGroupParams = Omit<Morbidity, 'id' | 'status' | 'morbidities'>

@Injectable()
export class MorbidityService {

  constructor(
    @Inject(MorbidityRepository) private readonly repository: MorbidityRepository,
    @Inject(MorbidityGroupService) private readonly groupService: MorbidityGroupService
  ) { }

  async create(createMorbidity: CreateMorbidityRequestDTO): Promise<Morbidity> {
    const group = await this.groupService.findOne({ id: createMorbidity.group });
    return await this.repository.create({ ...createMorbidity, group: group });
  }

  async find(params?: Partial<FindGroupParams>): Promise<Morbidity[]> {
    return await this.repository.find({ ...params, status: true });
  }

  async findOne(params?: Partial<FindGroupParams & { id: number }>): Promise<Morbidity> {
    return await this.repository.findOne(params);
  }

  async update(id: number, updateMorbidityDto: UpdateMorbidityRequestDTO): Promise<Morbidity> {
    return await this.repository.findOneAndUpdate({ id }, updateMorbidityDto);
  }

  async remove(id: number): Promise<void> {
    await this.repository.findOneAndUpdate({ id }, { status: false });
  }
}
