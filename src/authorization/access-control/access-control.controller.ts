import { Body, Controller, Inject, Param, Patch, UseGuards } from '@nestjs/common';
import { AccessControlService } from './access-control.service';
import {
    FindOneACClientAndUpdateResourcesRequestDTO,
    FindOneACClientAndUpdateResourcesResponseDTO,
    FindOneACClientAndUpdateRolesRequestDTO,
    FindOneACClientAndUpdateRolesResponseDTO
} from './dtos';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { AuthorizationGuard } from '@/shared/guards/authorization-guard/authorization.guard';
import { Authorize } from '@/shared/decorator';
import { ClaimEnum } from '@/shared';

@ApiTags('Authorization')
@ApiBearerAuth()
@Controller('access-control')
export class AccessControlController {
    constructor(
        @Inject(AccessControlService) private readonly controlService: AccessControlService
    ) { }

    @Authorize(ClaimEnum.UPDATE, 'access-control')
    @UseGuards(JwtAuthGuard, AuthorizationGuard)
    @Patch('role/:user')
    async findOneClientAndUpdateRoles(
        @Param('user') user: number,
        @Body() body: FindOneACClientAndUpdateRolesRequestDTO
    ): Promise<FindOneACClientAndUpdateRolesResponseDTO> {
        await this.controlService.updateAccessRoles(user, body);
        return {};
    }

    @Authorize(ClaimEnum.UPDATE, 'access-control')
    @UseGuards(JwtAuthGuard, AuthorizationGuard)
    @Patch('resource/:user')
    async findOneClientAndUpdateResources(
        @Param('user') user: number,
        @Body() body: FindOneACClientAndUpdateResourcesRequestDTO
    ): Promise<FindOneACClientAndUpdateResourcesResponseDTO> {
        await this.controlService.updateAccessResources(user, body);
        return {};
    }
}
