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
  ) { }

  async create(data: PostAreaRequestDto): Promise<Area> {
    return this.repository.create(data);
  }

  async findOne(id: number): Promise<Area> {
    return this.repository.findOne({ where: { id } });
  }

  async updateOne(id: number, data: PatchAreaRequestDto): Promise<Area> {
    await this.repository.findOneAndUpdate({ id: id }, { ...data });
    return await this.repository.findOne({ where: { id: id } });
  }

  async deleteOne(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id: id });
  }
}
