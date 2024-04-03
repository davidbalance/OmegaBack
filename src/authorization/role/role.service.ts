import { Inject, Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { Role } from './entities/role.entity';
import { ResourceService } from '../resource/resource.service';
import { In } from 'typeorm';
import { CreateRoleRequestDTO, FindOneRoleAndUpdateRequestDTO } from './dto';

@Injectable()
export class RoleService {
  constructor(
    @Inject(RoleRepository) private readonly repository: RoleRepository,
    @Inject(ResourceService) private readonly resourceService: ResourceService
  ) { }

  async create({ resources, ...data }: CreateRoleRequestDTO): Promise<Role> {
    const foundResources = await this.resourceService.findIn(resources);
    return await this.repository.create({ ...data, resources: foundResources });
  }

  async find(): Promise<Role[]> {
    return await this.repository.find({
      where: { status: true },
      select: {
        id: true,
        name: true,
        resources: {
          id: true,
          name: true,
          claim: true
        }
      }
    });
  }

  async findIn(ids: number[]): Promise<Role[]> {
    return await this.repository.find({ where: { id: In(ids) } });
  }

  async findOneAndUpdate(id: number, { resources, ...data }: FindOneRoleAndUpdateRequestDTO): Promise<Role> {
    const foundResources = await this.resourceService.findIn(resources);
    return await this.repository.findOneAndUpdate({ id }, { ...data, resources: foundResources });
  }

  async findOneAndDelete(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
