import { Inject, Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { Role } from './entities/role.entity';
import { PermissionService } from '../permission/permission.service';
import { CreateRoleRequestDTO, UpdateRolePermissionsRequestDTO, UpdateRoleRequestDTO } from './dto';

@Injectable()
export class RoleService {
  constructor(
    @Inject(RoleRepository) private readonly repository: RoleRepository,
    @Inject(PermissionService) private readonly permissionService: PermissionService
  ) { }

  async create(createRoleDto: CreateRoleRequestDTO): Promise<Role> {
    const permissions = await this.permissionService.find(createRoleDto.permissions);
    return await this.repository.create({ ...createRoleDto, permissions: permissions });
  }

  async find(): Promise<Role[]> {
    return await this.repository.find({ status: true }, { permissions: true }, { id: true, name: true, permissions: { id: true, resource: true, type: true } });
  }

  async findOneAndUpdate(id: number, updateRoleDto: UpdateRoleRequestDTO): Promise<Role> {
    return await this.repository.findOneAndUpdate({ id }, updateRoleDto);
  }

  async findOneAndUpdatePermissions(id: number, updateRoleDto: UpdateRolePermissionsRequestDTO): Promise<Role> {
    const permissions = await this.permissionService.find(updateRoleDto.permissions);
    return await this.repository.findOneAndUpdate({ id }, { permissions: permissions });
  }

  async findOneAndInactive(id: number): Promise<void> {
    await this.repository.findOneAndUpdateStatus(id, false);
  }
}
