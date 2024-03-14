import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleRepository } from './role.repository';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @Inject(RoleRepository) private readonly repository: RoleRepository
  ) { }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return await this.repository.create(createRoleDto);
  }

  async readAll(): Promise<Role[]> {
    return await this.repository.find({});
  }

  async readOneByID(id: number): Promise<Role> {
    return await this.repository.findOne({ id });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    return await this.repository.findOneAndUpdate({ id }, updateRoleDto);
  }

  async remove(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
