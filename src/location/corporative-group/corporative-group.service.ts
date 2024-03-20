import { Inject, Injectable } from '@nestjs/common';
import { CorporativeGroupRepository } from './corporative-group.repository';
import { CorporativeGroup } from './entities/corporative-group.entity';
import { CreateCorporativeGroupRequestDTO, IServiceCheckAvailability, UpdateCorporativeGroupRequestDTO } from '@/shared';

type FindCorporativeGroupParams = Omit<CorporativeGroup, 'id' | 'status' | 'companies'>;

@Injectable()
export class CorporativeGroupService {

  constructor(
    @Inject(CorporativeGroupRepository) private readonly repository: CorporativeGroupRepository
  ) { }

  async create(createCorporativeGroupDto: CreateCorporativeGroupRequestDTO): Promise<CorporativeGroup> {
    return await this.repository.create(createCorporativeGroupDto);
  }

  async find(params?: Partial<FindCorporativeGroupParams>): Promise<CorporativeGroup[]> {
    return await this.repository.find({ ...params, status: true });
  }

  async findOne(params?: Partial<FindCorporativeGroupParams & { id: number }>): Promise<CorporativeGroup> {
    return await this.repository.findOne({ ...params });
  }

  async update(id: number, updateCorporativeGroupDto: UpdateCorporativeGroupRequestDTO): Promise<CorporativeGroup> {
    return await this.repository.findOneAndUpdate({ id }, updateCorporativeGroupDto);
  }

  async inactive(id: number): Promise<CorporativeGroup> {
    return await this.repository.findOneAndUpdateStatus(id, false);
  }
}
