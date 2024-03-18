import { Inject, Injectable } from '@nestjs/common';
import { CreateCorporativeGroupDto } from './dto/create-corporative-group.dto';
import { UpdateCorporativeGroupDto } from './dto/update-corporative-group.dto';
import { CorporativeGroupRepository } from './corporative-group.repository';
import { CorporativeGroup } from './entities/corporative-group.entity';

@Injectable()
export class CorporativeGroupService {

  constructor(
    @Inject(CorporativeGroupRepository) private readonly repository: CorporativeGroupRepository
  ) { }

  async create(createCorporativeGroupDto: CreateCorporativeGroupDto): Promise<CorporativeGroup> {
    return await this.repository.create(createCorporativeGroupDto);
  }

  async readAll(): Promise<CorporativeGroup[]> {
    return await this.repository.find({ status: true });
  }

  async readOneByID(id: number): Promise<CorporativeGroup> {
    return await this.repository.findOne({ id });
  }

  async update(id: number, updateCorporativeGroupDto: UpdateCorporativeGroupDto): Promise<CorporativeGroup> {
    return await this.repository.findOneAndUpdate({ id }, updateCorporativeGroupDto);
  }

  async inactive(id: number): Promise<CorporativeGroup> {
    return await this.repository.findOneAndUpdateStatus(id, false);
  }
}
