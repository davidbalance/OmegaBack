import {
    Body,
    Controller,
    Inject,
    Param,
    Patch,
    UseGuards
} from '@nestjs/common';
import { AccessControlService } from './access-control.service';
import {
    FindOneACClientAndUpdateResourcesRequestDTO,
    FindOneACClientAndUpdateResourcesResponseDTO,
    FindOneACClientAndUpdateRolesRequestDTO,
    FindOneACClientAndUpdateRolesResponseDTO
} from './dtos';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';

@ApiTags('Authorization')
@Controller('access-control')
export class AccessControlController {
    constructor(
        @Inject(AccessControlService) private readonly controlService: AccessControlService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Patch('role/:user')
    async findOneClientAndUpdateRoles(
        @Param('user') user: number,
        @Body() body: FindOneACClientAndUpdateRolesRequestDTO
    ): Promise<FindOneACClientAndUpdateRolesResponseDTO> {
        await this.controlService.updateAccessRoles(user, body);
        return {};
    }

    @UseGuards(JwtAuthGuard)
    @Patch('resource/:user')
    async findOneClientAndUpdateResources(
        @Param('user') user: number,
        @Body() body: FindOneACClientAndUpdateResourcesRequestDTO
    ): Promise<FindOneACClientAndUpdateResourcesResponseDTO> {
        await this.controlService.updateAccessResources(user, body);
        return {};
    }
}
