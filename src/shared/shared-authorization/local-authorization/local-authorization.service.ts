import { AccessControlService } from '@/authorization/access-control/access-control.service';
import { Resource } from '@/authorization/resource/entities/resource.entity';
import { ClaimEnum } from '@/shared/enums';
import { Inject, Injectable } from '@nestjs/common';
import { AuthorizationService } from '../authorization.service';

@Injectable()
export class LocalAuthorizationService implements AuthorizationService {
    constructor(
        @Inject(AccessControlService) private readonly accessControl: AccessControlService
    ) { }

    async canAccess(user: number, claim: ClaimEnum, resources: string[]): Promise<boolean> {
        try {
            const accessControl = await this.accessControl.findOne(user);
            if (!accessControl.roles) return false;
            const currentResources: Resource[] = accessControl.roles.reduce((prev: Resource[], curr) => [...prev, ...curr.resources], []);
            currentResources.concat(accessControl.resources);
            return currentResources.some(e => resources.includes(e.name) && e.claim === claim);
        } catch (error) {
            return false;
        }
    }
}
