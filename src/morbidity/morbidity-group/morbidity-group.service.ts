import { Inject, Injectable } from '@nestjs/common';
import { MorbidityGroupRepository } from './morbidity-group.repository';
import { MorbidityGroup } from './entities/morbidity-group.entity';
import { CreateMorbidityGroupRequestDTO, FindOneMorbidityGroupAndUpdateRequestDTO } from './dtos';
import { SelectorOption } from '@/shared';

@Injectable()
export class MorbidityGroupService {

  constructor(
    @Inject(MorbidityGroupRepository) private readonly repository: MorbidityGroupRepository
  ) { }

  async create(group: CreateMorbidityGroupRequestDTO): Promise<MorbidityGroup> {
    return await this.repository.create(group);
  }

  async find(): Promise<MorbidityGroup[]> {
    return await this.repository.find({
      where: { status: true },
      select: {
        id: true,
        name: true
      },
      cache: {
        id: "morbidity-group-find-all-cache",
        milliseconds: 1000 * 60 * 15
      }
    });
  }

  async findOneById(id: number): Promise<MorbidityGroup> {
    return await this.repository.findOne({ where: { id } });
  }

  async findSelectorOptions(): Promise<SelectorOption<number>[]> {
    const groups = await this.repository.find({
      where: { status: true },
      select: {
        id: true,
        name: true
      },
      cache: {
        id: "morbidity-group-selector-options-cache",
        milliseconds: 1000 * 60 * 15
      }
    });
    const options = groups.map((e) => ({
      key: e.id,
      label: e.name
    } as SelectorOption<number>));
    return options;
  }

  async findOneAndUpdate(id: number, update: FindOneMorbidityGroupAndUpdateRequestDTO): Promise<MorbidityGroup> {
    return await this.repository.findOneAndUpdate({ id }, update);
  }
}
