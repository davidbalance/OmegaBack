import { Inject, Injectable } from '@nestjs/common';
import { AccessControlService } from './access-control/access-control.service';
import { Resource } from './resource/entities/resource.entity';
import { ClaimEnum } from '@/shared';

@Injectable()
export class AuthorizationService {
    constructor(
        @Inject(AccessControlService) private readonly accessControl: AccessControlService
    ) { }

    async canAccess(user: number, claim: ClaimEnum, resources: string[]): Promise<boolean> {
        const accessControl = await this.accessControl.findOne(user);
        const currentResources: Resource[] = accessControl.roles.reduce((prev: Resource[], curr) => [...prev, ...curr.resources], []);
        currentResources.concat(accessControl.resources);
        return currentResources.some(e => resources.includes(e.name) && e.claim === claim);
    }
}
