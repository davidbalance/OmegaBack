import { Inject, Injectable } from '@nestjs/common';
import { AccessControlService } from './access-control/access-control.service';
import { AuthorizationType } from './common';
import { Permission } from './permission/entities/permission.entity';

@Injectable()
export class AuthorizationService {
    constructor(
        @Inject(AccessControlService) private readonly accessControl: AccessControlService
    ) { }

    async canAccess(user: number, type: AuthorizationType, resources: string[]): Promise<boolean> {
        const accessControl = await this.accessControl.findOne(user);
        const permissions: Permission[] = accessControl.roles.reduce((prev: Permission[], curr) => [...prev, ...curr.permissions], []);
        permissions.concat(accessControl.permissions);
        return permissions.some(e => resources.includes(e.resource) && e.type === type);
    }
}
