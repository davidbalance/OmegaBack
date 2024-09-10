import { Controller, UseGuards, Inject, Get, Param, Query, UseInterceptors } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { GetMedicalResultArrayResponseDto } from "../dtos/response/medical-result-array.get.dto";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";
import { FilterMetaDto, CountMetaDto, PageResponseDto } from "@/shared/utils/bases/base.pagination.dto";
import { User } from "@/shared/decorator";
import { MedicalResultDoctorPaginationService } from "../services/medical-result-doctor-pagination.service";
import { DniInterceptor } from "@/shared/interceptors/dni/dni.interceptor";

@ApiTags('Medical>Result', 'Pagination')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(DniInterceptor)
@Controller('medical/:order/results/doctor')
export class MedicalResultDoctorPaginationController {
  constructor(
    @Inject(MedicalResultDoctorPaginationService) private readonly service: MedicalResultDoctorPaginationService
  ) { }

  @Get('paginate')
  async find(
    @Param('order') order: number,
    @User() doctor: string,
    @Query() query: FilterMetaDto
  ): Promise<GetMedicalResultArrayResponseDto> {
    const data = await this.service.find(query, { order, doctor });
    return plainToInstance(GetMedicalResultArrayResponseDto, { data });
  }

  @Get('pages')
  async count(
    @Param('order') order: number,
    @User() doctor: string,
    @Query() query: CountMetaDto
  ): Promise<PageResponseDto> {
    const pages = await this.service.count(query, { order, doctor });
    return plainToInstance(PageResponseDto, { pages });
  }
}
