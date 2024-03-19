import { Inject, Injectable } from '@nestjs/common';
import { PermissionRepository } from './permission.repository';
import { Permission } from './entities/permission.entity';
import { CreatePermissionRequestDTO } from './dto';
import { In } from 'typeorm';

interface PermissionServiceFindExtensions {
  /**
   * Finds all the permissions in the DB
   */
  find(): Promise<Permission[]>;
  /**
   * Finds all the permissions from the given arrays of ids
   */
  find(ids: number[]): Promise<Permission[]>;
}

@Injectable()
export class PermissionService implements PermissionServiceFindExtensions {

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
