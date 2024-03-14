import { Inject, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionRepository } from './permission.repository';
import { privateDecrypt } from 'crypto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService {

  constructor(
    @Inject(PermissionRepository) private readonly repository: PermissionRepository
  ) { }

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    return await this.repository.create(createPermissionDto);
  }

  async readAll(): Promise<Permission[]> {
    return await this.repository.find({});
  }

  async readOneByID(id: number): Promise<Permission> {
    return await this.repository.findOne({ id });
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto): Promise<Permission> {
    return await this.repository.findOneAndUpdate({ id }, updatePermissionDto);
  }

  async remove(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
