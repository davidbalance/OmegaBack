import { Inject, Injectable } from '@nestjs/common';
import { PermissionRepository } from './permission.repository';
import { Permission } from './entities/permission.entity';
import { CreatePermissionRequestDTO } from './dto';

interface PermissionServiceFindExtensions {
  find(): Promise<Permission[]>;
  find(app: string): Promise<Permission[]>;
}

@Injectable()
export class PermissionService implements PermissionServiceFindExtensions {

  constructor(
    @Inject(PermissionRepository) private readonly repository: PermissionRepository
  ) { }

  find(): Promise<Permission[]>;
  find(app: string): Promise<Permission[]>;
  async find(app?: string): Promise<Permission[]> {
    if (app) {
      return await this.repository.find({ app });
    } else {
      return await this.repository.find({});
    }
  }

  async create(createPermissionDto: CreatePermissionRequestDTO): Promise<Permission> {
    return await this.repository.create(createPermissionDto);
  }
}
