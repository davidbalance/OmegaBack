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
  async find(undefinedOrValue?: number[]): Promise<Permission[]> {
    if (undefinedOrValue) {
      return await this.repository.find({ id: In(undefinedOrValue) });
    } else {
      return await this.repository.find({});
    }
  }

  async create(createPermissionDto: CreatePermissionRequestDTO): Promise<Permission> {
    return await this.repository.create(createPermissionDto);
  }
}
