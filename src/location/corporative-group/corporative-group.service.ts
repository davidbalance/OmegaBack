import { Inject, Injectable } from '@nestjs/common';
import { CorporativeGroupRepository } from './corporative-group.repository';
import { CorporativeGroup } from './entities/corporative-group.entity';
import { CreateCorporativeGroupRequestDTO, FindOneOrCreateService, UpdateCorporativeGroupRequestDTO } from '@/shared';

type FindCorporativeGroupParams = Omit<CorporativeGroup, 'id' | 'status' | 'companies'>;

@Injectable()
export class CorporativeGroupService
  implements FindOneOrCreateService<CorporativeGroup> {

  constructor(
    @Inject(CorporativeGroupRepository) private readonly repository: CorporativeGroupRepository
  ) { }

  async findOneOrCreate(filterOption: any, createOption: any): Promise<CorporativeGroup> {
    const filter = filterOption as Partial<FindCorporativeGroupParams & { id: number }>;
    const groupOption = createOption as CreateCorporativeGroupRequestDTO;
    try {
      return await this.findOne(filter);
    } catch (error) {
      return await this.create(groupOption);
    }
  }

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
