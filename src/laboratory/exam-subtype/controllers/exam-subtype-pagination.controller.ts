import { Controller, Get, Inject, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';
import { GetExamSubtypeSngleArrayResponseDto } from '../dtos/response/get.exam-subtype-single-array.response.dto';
import { CountMetaDto, FilterMetaDto, PageResponseDto } from '@/shared/utils/bases/base.pagination.dto';
import { ExamSubtypePaginationService } from '../services/exam-subtype-pagination.service';

@ApiTags('Laboratory/Exam/Subtype', 'Pagination')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('laboratory/:type/subtypes')
export class ExamSubtypePaginationController {
  constructor(
    @Inject(ExamSubtypePaginationService) private readonly service: ExamSubtypePaginationService
  ) { }

  @Get('paginate')
  async find(
    @Param('type') type: number,
    @Query() query: FilterMetaDto
  ): Promise<GetExamSubtypeSngleArrayResponseDto> {
    const data = await this.service.find(query, type);
    return plainToInstance(GetExamSubtypeSngleArrayResponseDto, { data });
  }

  @Get('pages')
  async count(
    @Param('type') type: number,
    @Query() query: CountMetaDto
  ): Promise<PageResponseDto> {
    const pages = await this.service.count(query, type);
    return plainToInstance(PageResponseDto, { pages });
  }
}
