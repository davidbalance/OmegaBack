import { ManagementService } from "@/location/management/services/management.service";
import { Injectable, Inject } from "@nestjs/common";
import { Area } from "../entities/area.entity";
import { AreaRepository } from "../repositories/area.repository";
import { PostAreaRequestDto } from "../dtos/request/post.area.request.dto";
import { PatchAreaRequestDto } from "../dtos/request/patch.area.request.dto";

@Injectable()
export class AreaManagementService {

  constructor(
    @Inject(AreaRepository) private readonly repository: AreaRepository,
    @Inject(ManagementService) private readonly managementService: ManagementService
  ) { }

  async create({ management, ...area }: PostAreaRequestDto): Promise<Area> {
    const foundManagement = await this.managementService.findOne(management);
    const createdArea = await this.repository.create({ ...area, management: foundManagement });
    return createdArea;
  }

  async find(): Promise<Area[]> {
    const areas = await this.repository.find();
    return areas;
  }

  async findOne(id: number): Promise<Area> {
    const area = await this.repository.findOne({ where: { id } });
    return area;
  }

  async updateOne(id: number, { management, ...area }: PatchAreaRequestDto): Promise<Area> {
    const data = area;
    if (management) {
      const foundManagement = await this.managementService.findOne(management);
      data['management'] = foundManagement;
    }
    const updatedArea = await this.repository.findOneAndUpdate({ id: id }, { ...area });
    return updatedArea;
  }

  async deleteOne(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id: id });
  }
}
