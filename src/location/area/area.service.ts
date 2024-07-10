import { Inject, Injectable } from '@nestjs/common';
import { AreaRepository } from './area.repository';
import { ManagementService } from '../management/management.service';
import { PATCHAreaRequestDto, POSTAreaRequestDto } from './dto/area.request.dto';
import { Area } from './entities/area.entity';

@Injectable()
export class AreaService {

  constructor(
    @Inject(AreaRepository) private readonly repository: AreaRepository,
    @Inject(ManagementService) private readonly managementService: ManagementService
  ) { }

  async create({ management, ...area }: POSTAreaRequestDto): Promise<Area> {
    const foundManagement = await this.managementService.findOneById(management);
    const createdArea = await this.repository.create({ ...area, management: foundManagement });
    return createdArea;
  }

  async findAllAreas(): Promise<Area[]> {
    const areas = await this.repository.find();
    return areas;
  }

  async findOneByIdAndUpdate(id: number, { management, ...area }: PATCHAreaRequestDto): Promise<Area> {
    const foundManagement = await this.managementService.findOneById(management);
    const updatedArea = await this.repository.findOneAndUpdate({ id: id }, { ...area, management: foundManagement });
    return updatedArea;
  }

  async findOneByIdAndDelete(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id: id });
  }
}
