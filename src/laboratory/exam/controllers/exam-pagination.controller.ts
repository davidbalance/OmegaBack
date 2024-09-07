import { Controller, Get, Inject, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { GetExamArrayResponseDto } from "../dtos/response/exam-array.get.dto";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";
import { ExamPaginationService } from "../services/exam-pagination.service";
import { CountMetaDto, FilterMetaDto, PageResponseDto } from "@/shared/utils/bases/base.pagination.dto";

@ApiTags('Laboratory/Exam', 'Pagination')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('laboratory/:subtype/exams')
export class ExamPaginationController {
    constructor(
        @Inject(ExamPaginationService) private readonly service: ExamPaginationService
    ) { }

    @Get('paginate')
    async find(
        @Param('subtype') subtype: number,
        @Query() query: FilterMetaDto
    ): Promise<GetExamArrayResponseDto> {
        const data = await this.service.find(query, subtype);
        return plainToInstance(GetExamArrayResponseDto, { data });
    }

    @Get('pages')
    async count(
        @Param('subtype') subtype: number,
        @Query() query: CountMetaDto
    ): Promise<PageResponseDto> {
        const pages = await this.service.count(query, subtype);
        return plainToInstance(PageResponseDto, { pages });
    }
}