import { Body, Controller, Inject, Param, Patch } from '@nestjs/common';
import { AccessControlService } from './access-control.service';
import { FindOneACClientAndUpdateResourcesRequestDTO, FindOneACClientAndUpdateResourcesResponseDTO, FindOneACClientAndUpdateRolesRequestDTO, FindOneACClientAndUpdateRolesResponseDTO } from './dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authorization')
@Controller('access-control')
export class AccessControlController {
    constructor(
        @Inject(AccessControlService) private readonly controlService: AccessControlService
    ) { }

    @Patch('role/:user')
    async findOneClientAndUpdateRoles(
        @Param('user') user: number,
        @Body() body: FindOneACClientAndUpdateRolesRequestDTO
    ): Promise<FindOneACClientAndUpdateRolesResponseDTO> {
        await this.controlService.updateAccessRoles(user, body);
        return {};
    }

    @Patch('resource/:user')
    async findOneClientAndUpdateResources(
        @Param('user') user: number,
        @Body() body: FindOneACClientAndUpdateResourcesRequestDTO
    ): Promise<FindOneACClientAndUpdateResourcesResponseDTO> {
        await this.controlService.updateAccessResources(user, body);
        return {};
    }
}
