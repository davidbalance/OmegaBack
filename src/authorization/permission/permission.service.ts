import { Inject, Injectable } from '@nestjs/common';
import { PermissionRepository } from './permission.repository';
import { Permission } from './entities/permission.entity';
import { CreatePermissionRequestDTO } from './dto';
import { In } from 'typeorm';


@Injectable()
export class PermissionService {

  constructor(
    @Inject(PermissionRepository) private readonly repository: PermissionRepository
  ) { }

  find(): Promise<Permission[]>;
  find(ids: number[]): Promise<Permission[]>;
  async find(undefinedOrValue?: number[]): Promise<any> {
    let permissions: Permission[];
    if (undefinedOrValue) {
      permissions = await this.repository.find({ id: In(undefinedOrValue) }, null, { id: null, resource: true, type: true }, { type: 1, order: 1 });
    } else {
      permissions = await this.repository.find({}, null, { id: null, resource: true, type: true }, { type: 1, order: 1 });
    }
    const newPermission: any = {};
    permissions.forEach((e) => {
      if (!newPermission[e.resource]) {
        newPermission[e.resource] = [];
      }
      newPermission[e.resource] = [...newPermission[e.resource], e.type];
    })

    return newPermission;
  }

  async create(createPermissionDto: CreatePermissionRequestDTO): Promise<Permission> {
    return await this.repository.create(createPermissionDto);
  }
}
