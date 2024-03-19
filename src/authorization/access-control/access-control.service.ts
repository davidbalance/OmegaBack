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

    async createAccessInstance(user: string): Promise<AccessControl> {
        return await this.repository.create({ user: user });
    }

    async updateAccessRoles(user: string, roles: Role[]): Promise<AccessControl> {
        return await this.repository.findOneAndUpdate({ user: user }, { roles: roles });
    }

    async updateAccessPermission(user: string, permissions: Permission[]): Promise<AccessControl> {
        return await this.repository.findOneAndUpdate({ user: user }, { permissions: permissions });
    }

    async canAccess(user: string, route: string, type: AuthorizationType): Promise<boolean> {
        const accessControl = await this.repository.findOne({ user: user }, { permissions: true, roles: { permissions: true } });
        const permissions: Permission[] = accessControl.roles.reduce((prev: Permission[], curr) => [...prev, ...curr.permissions], []);
        permissions.concat(accessControl.permissions);
        return permissions.some(e => e.route === route && e.type === type);
    }
}
