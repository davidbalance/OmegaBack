import { Inject, Injectable } from '@nestjs/common';
import { PATCHManagementRequestDto, POSTManagementRequestDto } from './dto/management.request.dto';
import { Management } from './entities/management.entity';
import { ManagementRepository } from './management.repository';

@Injectable()
export class ManagementService {
  constructor(
    @Inject(ManagementRepository) private readonly repository: ManagementRepository
  ) { }

  async findAllManagement(): Promise<Management[]> {
    const managements = await this.repository.find({
      where: {
        status: true
      },
      relations: {
        areas: true
      }
    });
    return managements;
  }

  async create(createManagementDto: POSTManagementRequestDto): Promise<Management> {
    const management = await this.repository.create(createManagementDto);
    return management;
  }

  async findOneByIdAndUpdate(id: number, updateManagementDto: PATCHManagementRequestDto): Promise<Management> {
    const management = await this.repository.findOneAndUpdate({ id: id }, updateManagementDto);
    return management;
  }

  async findOneAndDelete(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id: id });
  }
}
