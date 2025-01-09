import { Inject, Injectable } from '@nestjs/common';
import { ManagementRepository } from '../repositories/management.repository';
import { PostManagementRequestDto } from '../dtos/request/management.post.dto';
import { PatchMagementRequestDto } from '../dtos/request/management.patch.dto';
import { Management } from '../dtos/response/management.base.dto';

@Injectable()
export class ManagementService {
  constructor(
    @Inject(ManagementRepository) private readonly repository: ManagementRepository
  ) { }

  async create(createManagementDto: PostManagementRequestDto): Promise<Management> {
    const management = await this.repository.create(createManagementDto);
    return management;
  }

  async findOne(id: number): Promise<Management> {
    const management = await this.repository.findOne({ where: { id: id } });
    return management;
  }

  async updateOne(id: number, updateManagementDto: PatchMagementRequestDto): Promise<Management> {
    const management = await this.repository.findOneAndUpdate({ id: id }, updateManagementDto);
    return management;
  }

  async deleteOne(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id: id });
  }
}
