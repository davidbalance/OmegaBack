import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@shared/shared/nest/guard";
import { InjectQuery } from "@omega/disease/nest/inject/query.inject";
import { plainToInstance } from "class-transformer";
import { DiseaseGroupFindOneQuery } from "@omega/disease/application/query/disease/disease-group-find-one.query";
import { DiseaseGroupFindManyQuery } from "@omega/disease/application/query/disease/disease-group-find-many.query";
import { DiseaseGroupManyResponseDto, DiseaseGroupOptionResponseDto, DiseaseGroupResponseDto } from "../dto/response/disease-group.dto";
import { DiseaseGroupModelMapper } from "../mapper/disease/disease-group-model.mapper";
import { DiseaseGroupFindManyQueryDto } from "../dto/query/disease-group-query.dto";
import { DiseaseGroupFindOptionsQuery } from "@omega/disease/application/query/disease/disease-group-find-options.query";

@ApiTags('Disease', 'Read')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('disease-groups')
export class DiseaseGroupReadController {
    constructor(
        @InjectQuery('DiseaseGroupFindOneQuery') private readonly findOneQuery: DiseaseGroupFindOneQuery,
        @InjectQuery('DiseaseGroupFindManyQuery') private readonly findManyQuery: DiseaseGroupFindManyQuery,
        @InjectQuery('DiseaseGroupFindOptionsQuery') private readonly findOptionsQuery: DiseaseGroupFindOptionsQuery,
    ) { }

    @Get('group/:groupId')
    async findOne(
        @Param('groupId') groupId: string,
    ): Promise<DiseaseGroupResponseDto> {
        const value = await this.findOneQuery.handleAsync({ groupId: groupId });
        const data = DiseaseGroupModelMapper.toDTO(value);
        return plainToInstance(DiseaseGroupResponseDto, data);
    }

    @Get()
    async findMany(
        @Query() query: DiseaseGroupFindManyQueryDto
    ): Promise<DiseaseGroupManyResponseDto> {
        const value = await this.findManyQuery.handleAsync({
            ...query,
            order: query.orderField && query.orderValue ? { [query.orderField]: query.orderValue } : undefined
        });
        const data = value.data.map(e => DiseaseGroupModelMapper.toDTO(e));
        return plainToInstance(DiseaseGroupManyResponseDto, { ...value, data });
    }

    @Get('options')
    async findOptions(): Promise<DiseaseGroupOptionResponseDto[]> {
        const values = await this.findOptionsQuery.handleAsync();
        return plainToInstance(DiseaseGroupOptionResponseDto, values);
    }
}