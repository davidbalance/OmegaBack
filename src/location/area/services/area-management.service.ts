import { ManagementService } from "@/location/management/services/management.service";
import { Injectable, Inject } from "@nestjs/common";
import { Area } from "../entities/area.entity";
import { AreaRepository } from "../repositories/area.repository";
import { PATCHAreaRequestDto } from "../dtos/patch.area.dto";
import { POSTAreaRequestDto } from "../dtos/post.area.dto";

@Injectable()
export class AreaManagementService {

  constructor(
    @Inject(AreaRepository) private readonly repository: AreaRepository,
    @Inject(ManagementService) private readonly managementService: ManagementService
  ) { }

  async create({ management, ...area }: POSTAreaRequestDto): Promise<Area> {
    const foundManagement = await this.managementService.findOneById(management);
    const createdArea = await this.repository.create({ ...area, management: foundManagement });
    return createdArea;
  }

  async find(): Promise<Area[]> {
    const areas = await this.repository.find();
    return areas;
  }

  async updateOne(id: number, { management, ...area }: PATCHAreaRequestDto): Promise<Area> {
    const foundManagement = await this.managementService.findOneById(management);
    const updatedArea = await this.repository.findOneAndUpdate({ id: id }, { ...area, management: foundManagement });
    return updatedArea;
  }

  async deleteOne(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id: id });
  }
}
