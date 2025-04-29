import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@shared/shared/nest/guard";
import { plainToInstance } from "class-transformer";
import { InjectQuery } from "@omega/location/nest/inject/query.inject";
import { ManagementFindOneQuery } from "@omega/location/application/query/management/management-find-one.query";
import { ManagementFindManyQuery } from "@omega/location/application/query/management/management-find-many.query";
import { ManagementFindOptionsQuery } from "@omega/location/application/query/management/management-find-options.query";
import { ManagementManyResponseDto, ManagementOptionResponseDto, ManagementResponseDto } from "../dto/response/management.dto";
import { ManagementModelMapper } from "../mapper/management-model.mapper";
import { ManagementFindManyQueryDto } from "../dto/query/management-query.dto";

@ApiTags('Location', 'Read')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('managements')
export class ManagementReadController {
    constructor(
        @InjectQuery('ManagementFindOne') private readonly findOneQuery: ManagementFindOneQuery,
        @InjectQuery('ManagementFindMany') private readonly findManyQuery: ManagementFindManyQuery,
        @InjectQuery('ManagementFindOptions') private readonly findOptionQuery: ManagementFindOptionsQuery
    ) { }

    @Get('management/:managementId')
    async findOne(
        @Param('managementId') managementId: string,
    ): Promise<ManagementResponseDto> {
        const value = await this.findOneQuery.handleAsync({ managementId });
        const data = ManagementModelMapper.toDTO(value);
        return plainToInstance(ManagementResponseDto, data);
    }

    @Get()
    async findMany(
        @Query() query: ManagementFindManyQueryDto
    ): Promise<ManagementManyResponseDto> {
        const value = await this.findManyQuery.handleAsync({
            ...query,
            order: query.orderField && query.orderValue ? {
                [query.orderField]: query.orderValue
            } : undefined
        });
        const data = value.data.map(e => ManagementModelMapper.toDTO(e));
        return plainToInstance(ManagementManyResponseDto, { ...value, data });
    }

    @Get('options')
    async findOptions(): Promise<ManagementOptionResponseDto[]> {
        const data = await this.findOptionQuery.handleAsync();
        return plainToInstance(ManagementOptionResponseDto, data);
    }
}