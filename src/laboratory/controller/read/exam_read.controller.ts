import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ExamFindManyQuery } from "@omega/laboratory/application/query/exam/exam-find-many.query";
import { ExamFindOneQuery } from "@omega/laboratory/application/query/exam/exam-find-one.query";
import { InjectQuery } from "@omega/laboratory/nest/inject/query.inject";
import { AuthGuard } from "@shared/shared/nest/guard";
import { ExamResponseDto } from "../dto/response/exam.dto";
import { ExamModelMapper } from "../mapper/exam/exam_model.mapper";
import { plainToInstance } from "class-transformer";
import { ExamFindManyQueryDto } from "../dto/query/exam_query.dto";

@ApiTags('Laboratory', 'Read')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('exams')
export class ExamReadController {
    constructor(
        @InjectQuery('ExamFindOne') private readonly findOneQuery: ExamFindOneQuery,
        @InjectQuery('ExamFindMany') private readonly findManyQuery: ExamFindManyQuery
    ) { }

    @Get('exam/:examId')
    async findOne(
        @Param('examId') examId: string,
    ): Promise<ExamResponseDto> {
        const value = await this.findOneQuery.handleAsync({ examId });
        const data = ExamModelMapper.toDTO(value);
        return plainToInstance(ExamResponseDto, data);
    }

    @Get(':subtypeId')
    async findMany(
        @Param('subtypeId') subtypeId: string,
        @Query() query: ExamFindManyQueryDto
    ): Promise<ExamResponseDto[]> {
        const values = await this.findManyQuery.handleAsync({
            ...query,
            subtypeId,
            order: query.orderField && query.orderValue ? { [query.orderField]: query.orderValue } : undefined
        });
        const data = values.map(e => ExamModelMapper.toDTO(e));
        return plainToInstance(ExamResponseDto, data);
    }
}