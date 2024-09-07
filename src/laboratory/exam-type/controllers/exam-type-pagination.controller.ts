import { UseGuards, Controller, Inject, Get, Query } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";
import { ExamTypePaginationService } from "../services/exam-type-pagination.service";
import { CountMetaDto, FilterMetaDto, PageResponseDto } from "@/shared/utils/bases/base.pagination.dto";
import { GetExamTypeArrayResponseDto } from "../dtos/response/exam-type-array.get.dto";

@ApiTags('Laboratory/Exam/Type', 'Pagination')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('laboratory/types')
export class ExamTypePaginationController {
  constructor(
    @Inject(ExamTypePaginationService) private readonly service: ExamTypePaginationService
  ) { }

  @Get('paginate')
  async find(
    @Query() query: FilterMetaDto
  ): Promise<GetExamTypeArrayResponseDto> {
    const data = await this.service.find(query);
    return plainToInstance(GetExamTypeArrayResponseDto, { data });
  }

  @Get('pages')
  async count(
    @Query() query: CountMetaDto
  ): Promise<PageResponseDto> {
    const pages = await this.service.count(query);
    return plainToInstance(PageResponseDto, { pages });
  }
}