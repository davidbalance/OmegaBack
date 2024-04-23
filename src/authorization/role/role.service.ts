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

  /**
   * Creates a new role with the given options
   * @param param0 
   * @returns Role
   */
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

  /**
   * Find all roles that matches the given array of numbers
   * @param ids 
   * @returns Array of Role
   */
  async findIn(ids: number[]): Promise<Role[]> {
    return await this.repository.find({ where: { id: In(ids) } });
  }

  /**
   * Find one role and updates it with the given values
   * @param id 
   * @param param1 
   * @returns Role
   */
  async findOneAndUpdate(id: number, { resources, ...data }: FindOneRoleAndUpdateRequestDTO): Promise<Role> {
    const foundResources = await this.resourceService.findIn(resources);
    return await this.repository.findOneAndUpdate({ id }, { ...data, resources: foundResources });
  }

  /**
   * Find one role and change its state to inactive
   * @param id 
   */
  async findOneAndDelete(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
