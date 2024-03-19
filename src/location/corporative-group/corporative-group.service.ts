import { Inject, Injectable } from '@nestjs/common';
import { CorporativeGroupRepository } from './corporative-group.repository';
import { CorporativeGroup } from './entities/corporative-group.entity';
import { CreateCorporativeGroupRequestDTO, FindOneOrCreateCorporativeGroupRequestDTO, IServiceCheckAvailability, UpdateCorporativeGroupRequestDTO } from '@/shared';

@Injectable()
export class CorporativeGroupService
  implements IServiceCheckAvailability<number> {

  constructor(
    @Inject(CorporativeGroupRepository) private readonly repository: CorporativeGroupRepository
  ) { }

  async checkAvailability(key: number): Promise<boolean> {
    const entity = await this.repository.findOne({ id: key });
    return entity.status;
  }

  async create(createCorporativeGroupDto: CreateCorporativeGroupRequestDTO): Promise<CorporativeGroup> {
    return await this.repository.create(createCorporativeGroupDto);
  }

  async readAll(): Promise<CorporativeGroup[]> {
    return await this.repository.find({ status: true });
  }

  async readOneByID(id: number): Promise<CorporativeGroup> {
    return await this.repository.findOne({ id });
  }

  async update(id: number, updateCorporativeGroupDto: UpdateCorporativeGroupRequestDTO): Promise<CorporativeGroup> {
    return await this.repository.findOneAndUpdate({ id }, updateCorporativeGroupDto);
  }

  async inactive(id: number): Promise<CorporativeGroup> {
    return await this.repository.findOneAndUpdateStatus(id, false);
  }
}
