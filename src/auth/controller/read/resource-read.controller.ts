import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@shared/shared/nest/guard";
import { InjectQuery } from "@omega/auth/nest/inject/query.inject";
import { ResourceFindOneQuery } from "@omega/auth/application/query/resource/resource-find-one.query";
import { ResourceFindManyQuery } from "@omega/auth/application/query/resource/resource-find-many.query";
import { ResourceResponseDto } from "../dto/response/resource.dto";
import { ResourceModelMapper } from "../mapper/resource-model.mapper";
import { plainToInstance } from "class-transformer";

@ApiTags('Auth', 'Read')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('resources')
export class ResourceReadController {
    constructor(
        @InjectQuery('ResourceFindOne') private readonly resourceFindOne: ResourceFindOneQuery,
        @InjectQuery('ResourceFindMany') private readonly resourceFindMany: ResourceFindManyQuery,
    ) { }

    @Get(':resourceId')
    async findOne(
        @Param('resourceId') resourceId: string
    ): Promise<ResourceResponseDto> {
        const value = await this.resourceFindOne.handleAsync({ resourceId });
        const data = ResourceModelMapper.toDTO(value)
        return plainToInstance(ResourceResponseDto, data);
    }

    @Get()
    async findMany(): Promise<ResourceResponseDto[]> {
        const value = await this.resourceFindMany.handleAsync();
        const data = value.map(e => ResourceModelMapper.toDTO(e));
        return plainToInstance(ResourceResponseDto, data);
    }

}