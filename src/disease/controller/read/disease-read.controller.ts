import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@shared/shared/nest/guard";
import { InjectQuery } from "@omega/disease/nest/inject/query.inject";
import { DiseaseFindOneQuery } from "@omega/disease/application/query/disease/disease-find-one.query";
import { DiseaseModelMapper } from "../mapper/disease/disease-model.mapper";
import { plainToInstance } from "class-transformer";
import { DiseaseManyResponseDto, DiseaseResponseDto } from "../dto/response/disease.dto";
import { DiseaseFindManyQuery } from "@omega/disease/application/query/disease/disease-find-many.query";
import { DiseaseFindManyQueryDto } from "../dto/query/disease-query.dto";

@ApiTags('Disease', 'Read')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('diseases')
export class DiseaseReadController {
    constructor(
        @InjectQuery('DiseaseFindOneQuery') private readonly findOneQuery: DiseaseFindOneQuery,
        @InjectQuery('DiseaseFindManyQuery') private readonly findManyQuery: DiseaseFindManyQuery
    ) { }

    @Get('disease/:diseaseId')
    async findOne(
        @Param('diseaseId') diseaseId: string,
    ): Promise<DiseaseResponseDto> {
        const value = await this.findOneQuery.handleAsync({ diseaseId: diseaseId });
        const data = DiseaseModelMapper.toDTO(value);
        return plainToInstance(DiseaseResponseDto, data);
    }

    @Get(':groupId')
    async findMany(
        @Param('groupId') groupId: string,
        @Query() query: DiseaseFindManyQueryDto
    ): Promise<DiseaseManyResponseDto> {
        const value = await this.findManyQuery.handleAsync({
            ...query,
            groupId,
            order: query.orderField && query.orderValue ? { [query.orderField]: query.orderValue } : undefined
        });
        const data = value.data.map(e => DiseaseModelMapper.toDTO(e));
        return plainToInstance(DiseaseManyResponseDto, { ...value, data });
    }
}