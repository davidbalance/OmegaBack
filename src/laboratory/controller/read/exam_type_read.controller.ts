import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { InjectQuery } from "@omega/laboratory/nest/inject/query.inject";
import { AuthGuard } from "@shared/shared/nest/guard";
import { plainToInstance } from "class-transformer";
import { ExamTypeFindOptionsQuery } from "@omega/laboratory/application/query/exam/exam-type-find-options.query";
import { ExamTypeFindManyQuery } from "@omega/laboratory/application/query/exam/exam-type-find-many.query";
import { ExamTypeFindManyQueryDto } from "../dto/query/exam_type_query.dto";
import { ExamTypeModelMapper } from "../mapper/exam/exam_type_model.mapper";
import { ExamTypeManyResponseDto, ExamTypeOptionResponseDto } from "../dto/response/exam_type.dto";

@ApiTags('Laboratory', 'Read')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('exam-types')
export class ExamTypeReadController {
    constructor(
        @InjectQuery('ExamTypeFindMany') private readonly findManyQuery: ExamTypeFindManyQuery,
        @InjectQuery('ExamTypeFindOptions') private readonly findOptionsQuery: ExamTypeFindOptionsQuery,
    ) { }

    @Get()
    async findMany(
        @Query() query: ExamTypeFindManyQueryDto
    ): Promise<ExamTypeManyResponseDto> {
        const value = await this.findManyQuery.handleAsync({
            ...query,
            order: query.orderField && query.orderValue ? { [query.orderField]: query.orderValue } : undefined
        });
        const data = value.data.map(e => ExamTypeModelMapper.toDTO(e));
        return plainToInstance(ExamTypeManyResponseDto, { ...value, data });
    }

    @Get('options')
    async findOptions(): Promise<ExamTypeOptionResponseDto[]> {
        const data = await this.findOptionsQuery.handleAsync();
        return plainToInstance(ExamTypeOptionResponseDto, data);
    }
}