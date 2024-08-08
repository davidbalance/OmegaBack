import { Inject, Injectable } from '@nestjs/common';
import { CorporativeGroupRepository } from '../repositories/corporative-group.repository';
import { CorporativeGroup } from '../entities/corporative-group.entity';
import { PostCorporativeGroupRequestDto } from '../dtos/request/post.corporative-group.dto';

@Injectable()
export class CorporativeGroupManagementService {

  constructor(
    @Inject(CorporativeGroupRepository) private readonly repository: CorporativeGroupRepository
  ) { }

  async create(data: PostCorporativeGroupRequestDto): Promise<CorporativeGroup> {
    return this.repository.create(data);
  }

  async find(): Promise<CorporativeGroup[]> {
    const groups = await this.repository.find({
      where: { status: true },
      relations: { companies: { branches: { city: true } } }
    });
    return groups;
  }

  async findOne(id: number): Promise<CorporativeGroup> {
    return await this.repository.findOne({ where: { id }, relations: { companies: { branches: true } } });
  }

  async updateOne(id: number, body: PostCorporativeGroupRequestDto): Promise<CorporativeGroup> {
    return await this.repository.findOneAndUpdate({ id }, body);
  }

  async deleteOne(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
