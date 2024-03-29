import { Inject, Injectable } from '@nestjs/common';
import { AccessControlRepository } from './access-control.repository';
import { AccessControl } from './entity/access-control.entity';
import { Role } from '../role/entities/role.entity';
import { FindOneACClientAndUpdateResourcesRequestDTO, FindOneACClientAndUpdateRolesRequestDTO } from './dtos';
import { ResourceService } from '../resource/resource.service';
import { RoleService } from '../role/role.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AccessControlEvent, AccessControlUpdateEvent } from '@/shared';
import e from 'express';
import { Resource } from '../resource/entities/resource.entity';

@Injectable()
export class AccessControlService {
    constructor(
        @Inject(AccessControlRepository) private readonly repository: AccessControlRepository,
        @Inject(RoleService) private readonly roleService: RoleService,
        @Inject(ResourceService) private readonly resourceService: ResourceService,
        @Inject(EventEmitter2) private readonly eventEmitter: EventEmitter2
    ) { }

    async findOne(user: number): Promise<AccessControl> {
        return await this.repository.findOne({ where: { user: user } });
    }

    async updateAccessRoles(user: number, { roles }: FindOneACClientAndUpdateRolesRequestDTO): Promise<AccessControl> {
        const foundRoles = await this.roleService.findIn(roles);
        const client = await this.repository.findOneAndUpdate({ user: user }, { roles: foundRoles });
        const resources = foundRoles.reduce((prev: Resource[], curr) => [...prev, ...curr.resources], []);
        const resourcesName = resources.reduce((prev: string[], curr) => [...prev, curr.name], []);
        this.eventEmitter.emit(AccessControlEvent.UPDATE, new AccessControlUpdateEvent({ id: user, resources: resourcesName }))
        return client
    }

    async updateAccessPermission(user: number, { resources }: FindOneACClientAndUpdateResourcesRequestDTO): Promise<AccessControl> {
        const foundResources = await this.resourceService.findIn(resources);
        return await this.repository.findOneAndUpdate({ user: user }, { resources: foundResources });
    }
}
