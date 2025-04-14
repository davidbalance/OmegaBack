import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@shared/shared/nest/guard";
import { plainToInstance } from "class-transformer";
import { AreaFindManyQueryDto } from "../dto/query/area_query.dto";
import { InjectQuery } from "@omega/location/nest/inject/query.inject";
import { AreaFindOneQuery } from "@omega/location/application/query/area/area-find-one.query";
import { AreaFindManyQuery } from "@omega/location/application/query/area/area-find-many.query";
import { AreaFindOptionsQuery } from "@omega/location/application/query/area/area-find-options.query";
import { AreaManyResponseDto, AreaOptionResponseDto, AreaResponseDto } from "../dto/response/area.dto";
import { AreaModelMapper } from "../mapper/area_model.mapper";

@ApiTags('Location', 'Read')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('areas')
export class AreaReadController {
    constructor(
        @InjectQuery('AreaFindOne') private readonly findOneQuery: AreaFindOneQuery,
        @InjectQuery('AreaFindMany') private readonly findManyQuery: AreaFindManyQuery,
        @InjectQuery('AreaFindOptions') private readonly findOptionQuery: AreaFindOptionsQuery
    ) { }

    @Get('area/:areaId')
    async findOne(
        @Param('areaId') areaId: string,
    ): Promise<AreaResponseDto> {
        const value = await this.findOneQuery.handleAsync({ areaId });
        const data = AreaModelMapper.toDTO(value);
        return plainToInstance(AreaResponseDto, data);
    }

    @Get()
    async findMany(
        @Query() query: AreaFindManyQueryDto
    ): Promise<AreaManyResponseDto> {
        const value = await this.findManyQuery.handleAsync({
            ...query,
            order: query.orderField && query.orderValue ? {
                [query.orderField]: query.orderValue
            } : undefined
        });
        const data = value.data.map(e => AreaModelMapper.toDTO(e));
        return plainToInstance(AreaManyResponseDto, { ...value, data });
    }

    @Get('options')
    async findOptions(): Promise<AreaOptionResponseDto[]> {
        const data = await this.findOptionQuery.handleAsync();
        return plainToInstance(AreaOptionResponseDto, data);
    }
}