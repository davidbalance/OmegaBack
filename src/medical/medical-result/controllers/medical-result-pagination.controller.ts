import { Controller, UseGuards, Inject, Get, Param, Query } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { GetMedicalResultArrayResponseDto } from "../dtos/response/medical-result-array.get.dto";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";
import { MedicalResultPaginationService } from "../services/medical-result-pagination.service";
import { FilterMetaDto, CountMetaDto, PageResponseDto } from "@/shared/utils/bases/base.pagination.dto";

@ApiTags('Medical/Result', 'Pagination')
@ApiBearerAuth()
@Controller('medical/:order/results')
@UseGuards(JwtAuthGuard)
export class MedicalResultPaginationController {
  constructor(
    @Inject(MedicalResultPaginationService) private readonly service: MedicalResultPaginationService
  ) { }

  @Get('paginate')
  async find(
    @Param('order') company: number,
    @Query() query: FilterMetaDto
  ): Promise<GetMedicalResultArrayResponseDto> {
    const data = await this.service.find(query, company);
    return plainToInstance(GetMedicalResultArrayResponseDto, { data });
  }

  @Get('pages')
  async count(
    @Param('order') company: number,
    @Query() query: CountMetaDto
  ): Promise<PageResponseDto> {
    const pages = await this.service.count(query, company);
    return plainToInstance(PageResponseDto, { pages });
  }
}
