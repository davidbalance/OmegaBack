import { Inject, Injectable } from '@nestjs/common';
import { AccessControlRepository } from './access-control.repository';
import { AccessControl } from './entity/access-control.entity';
import { Role } from '../role/entities/role.entity';
import { FindOneACClientAndUpdateResourcesRequestDTO, FindOneACClientAndUpdateRolesRequestDTO } from './dtos';
import { ResourceService } from '../resource/resource.service';
import { RoleService } from '../role/role.service';

@Injectable()
export class AccessControlService {
    constructor(
        @Inject(AccessControlRepository) private readonly repository: AccessControlRepository,
        @Inject(RoleService) private readonly roleService: RoleService,
        @Inject(ResourceService) private readonly resourceService: ResourceService
    ) { }

    async updateAccessRoles(user: number, { roles }: FindOneACClientAndUpdateRolesRequestDTO): Promise<AccessControl> {
        const foundRoles = await this.roleService.findIn(roles);
        return await this.repository.findOneAndUpdate({ user: user }, { roles: foundRoles });
    }

    async updateAccessPermission(user: number, { resources }: FindOneACClientAndUpdateResourcesRequestDTO): Promise<AccessControl> {
        const foundResources = await this.resourceService.findIn(resources);
        return await this.repository.findOneAndUpdate({ user: user }, { resources: foundResources });
    }
}
