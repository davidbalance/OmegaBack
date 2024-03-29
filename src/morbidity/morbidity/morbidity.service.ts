import { Inject, Injectable } from '@nestjs/common';
import { MorbidityRepository } from './morbidity.repository';
import { Morbidity } from './entities/morbidity.entity';
import { MorbidityGroupService } from '../morbidity-group/morbidity-group.service';
import { CreateMorbidityRequestDTO, FindMorbidity, FindOneMorbidityAndUpdateRequestDTO } from './dtos';
import { SelectorOption } from '@/shared';

@Injectable()
export class MorbidityService {

  constructor(
    @Inject(MorbidityRepository) private readonly repository: MorbidityRepository,
    @Inject(MorbidityGroupService) private readonly groupService: MorbidityGroupService
  ) { }

  async create({ group, ...data }: CreateMorbidityRequestDTO): Promise<Morbidity> {
    const morbidityGroup = await this.groupService.findOneById(group);
    return await this.repository.create({ ...data, group: morbidityGroup });
  }

  async find(): Promise<FindMorbidity[]> {
    const morbidities = await this.repository.find({
      where: { status: true },
      select: {
        id: true,
        name: true
      }
    });
    return morbidities;
  }

  async findSelectorOptions(): Promise<SelectorOption<number>[]> {
    const morbidities = await this.repository.find({
      where: { status: true },
      select: {
        id: true,
        name: true
      }
    });
    const options = await morbidities.map((e) => ({
      key: e.id,
      label: e.name
    } as SelectorOption<number>));
    return options;
  }

  async findOneAndUpdate(id: number, { group, ...data }: FindOneMorbidityAndUpdateRequestDTO): Promise<Morbidity> {
    if (group) {
      const morbidityGroup = await this.groupService.findOneById(group);
      return await this.repository.findOneAndUpdate({ id }, { ...data, group: morbidityGroup });
    } else {
      return await this.repository.findOneAndUpdate({ id }, { ...data });
    }
  }
}
