import { ManagementService } from "@/location/management/services/management.service";
import { Injectable, Inject } from "@nestjs/common";
import { AreaRepository } from "../repositories/area.repository";
import { PostAreaRequestDto } from "../dtos/request/area.post.request.dto";
import { PatchAreaRequestDto } from "../dtos/request/area.patch.dto";
import { Area } from "../dtos/response/area.base.dto";

@Injectable()
export class AreaManagementService {

  constructor(
    @Inject(AreaRepository) private readonly repository: AreaRepository,
    @Inject(ManagementService) private readonly managementService: ManagementService
  ) { }

  async create({ management, ...data }: PostAreaRequestDto): Promise<Area> {
    const foundManagement = await this.managementService.findOne(management);
    const area = await this.repository.create({ ...data, management: foundManagement });
    return { ...area, management };
  }

  async findOne(id: number): Promise<Area> {
    const area = await this.repository.findOne({ where: { id }, relations: { management: true } });
    return { ...area, management: area.management.id };
  }

  async updateOne(id: number, { management, ...data }: PatchAreaRequestDto): Promise<Area> {
    if (management) {
      const foundManagement = await this.managementService.findOne(management);
      data['management'] = foundManagement;
    }
    const area = await this.repository.findOneAndUpdate({ id: id }, { ...data });
    return { ...area, management: area.management.id };
  }

  async deleteOne(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id: id });
  }
}
