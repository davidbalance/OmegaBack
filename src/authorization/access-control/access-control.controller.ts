import { Body, Controller, Get, Inject, Param, Patch, UseGuards } from '@nestjs/common';
import { AccessControlService } from './access-control.service';
import {
    FindOneACClient,
    FindOneACClientAndUpdateResourcesRequestDTO,
    FindOneACClientAndUpdateResourcesResponseDTO,
    FindOneACClientAndUpdateRolesRequestDTO,
    FindOneACClientAndUpdateRolesResponseDTO
} from './dtos';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { plainToInstance } from 'class-transformer';

@ApiTags('Authorization')
@ApiBearerAuth()
@Controller('access-control')
export class AccessControlController {
    constructor(
        @Inject(AccessControlService) private readonly controlService: AccessControlService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get('client/:client')
    async findOne(
        @Param('client') user: number
    ): Promise<FindOneACClient> {
        const client = await this.controlService.findOne(user);
        return plainToInstance(FindOneACClient, client)
    }

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
