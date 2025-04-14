import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { InjectQuery } from "@omega/laboratory/nest/inject/query.inject";
import { AuthGuard } from "@shared/shared/nest/guard";
import { plainToInstance } from "class-transformer";
import { ExamSubtypeManyResponseDto, ExamSubtypeResponseDto } from "../dto/response/exam_subtype.dto";
import { ExamSubtypeFindOneQuery } from "@omega/laboratory/application/query/exam/exam-subtype-find-one.query";
import { ExamSubtypeFindManyQuery } from "@omega/laboratory/application/query/exam/exam-subtype-find-many.query";
import { ExamSubtypeModelMapper } from "../mapper/exam/exam_subtype_model.mapper";
import { ExamSubtypeFindManyQueryDto } from "../dto/query/exam_subtype_query.dto";

@ApiTags('Laboratory', 'Read')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('exam-subtypes')
export class ExamSubtypeReadController {
    constructor(
        @InjectQuery('ExamSubtypeFindOne') private readonly findOneQuery: ExamSubtypeFindOneQuery,
        @InjectQuery('ExamSubtypeFindMany') private readonly findManyQuery: ExamSubtypeFindManyQuery
    ) { }

    @Get('subtype/:subtypeId')
    async findOne(
        @Param('subtypeId') subtypeId: string,
    ): Promise<ExamSubtypeResponseDto> {
        const value = await this.findOneQuery.handleAsync({ subtypeId });
        const data = ExamSubtypeModelMapper.toDTO(value);
        return plainToInstance(ExamSubtypeResponseDto, data);
    }

    @Get(':typeId')
    async findMany(
        @Param('typeId') typeId: string,
        @Query() query: ExamSubtypeFindManyQueryDto
    ): Promise<ExamSubtypeManyResponseDto> {
        const value = await this.findManyQuery.handleAsync({
            ...query,
            typeId,
            order: query.orderField && query.orderValue ? { [query.orderField]: query.orderValue } : undefined
        });
        const data = value.data.map(e => ExamSubtypeModelMapper.toDTO(e));
        return plainToInstance(ExamSubtypeManyResponseDto, { ...value, data });
    }
}