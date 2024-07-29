import { Inject, Injectable } from '@nestjs/common';
import { Management } from '../entities/management.entity';
import { ManagementRepository } from '../repositories/management.repository';
import { PATCHManagementRequestDto } from '../dtos/patch.management.dto';
import { POSTManagementRequestDto } from '../dtos/post.management.dto';

@Injectable()
export class ManagementService {
  constructor(
    @Inject(ManagementRepository) private readonly repository: ManagementRepository
  ) { }

  async create(createManagementDto: POSTManagementRequestDto): Promise<Management> {
    const management = await this.repository.create(createManagementDto);
    return management;
  }

  async find(): Promise<Management[]> {
    const managements = await this.repository.find({
      where: { status: true },
      relations: { areas: true }
    });
    return managements;
  }

  async findOneById(id: number): Promise<Management> {
    const management = await this.repository.findOne({ where: { id: id } });
    return management;
  }

  async updateOne(id: number, updateManagementDto: PATCHManagementRequestDto): Promise<Management> {
    const management = await this.repository.findOneAndUpdate({ id: id }, updateManagementDto);
    return management;
  }

  async deleteOne(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id: id });
  }
}
