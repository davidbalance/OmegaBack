import { Inject, Injectable } from '@nestjs/common';
import { AccessControlRepository } from './access-control.repository';
import { AccessControl } from './entity/access-control.entity';
import { Role } from '../role/entities/role.entity';
import { Permission } from '../permission/entities/permission.entity';
import { AuthorizationType } from '../common';

@Injectable()
export class AccessControlService {
    constructor(
        @Inject(AccessControlRepository) private readonly repository: AccessControlRepository
    ) { }

    async createAccessInstance(user: number): Promise<AccessControl> {
        return await this.repository.create({ user: user });
    }

    async findOne(user: number): Promise<AccessControl> {
        return await this.repository.findOne({ user: user }, { permissions: true, roles: { permissions: true } });
    }

    async updateAccessRoles(user: number, roles: Role[]): Promise<AccessControl> {
        return await this.repository.findOneAndUpdate({ user: user }, { roles: roles });
    }

    async updateAccessPermission(user: number, permissions: Permission[]): Promise<AccessControl> {
        return await this.repository.findOneAndUpdate({ user: user }, { permissions: permissions });
    }
}
