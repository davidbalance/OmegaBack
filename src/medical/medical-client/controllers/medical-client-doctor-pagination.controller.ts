import { User } from '@/shared/decorator';
import { Controller, Get, Inject, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { GetMedicalClientArrayResponseDto } from '../dtos/response/medical-client-array.get.dto';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';
import { MedicalClientDoctorPaginationService } from '../services/medical-client-doctor-pagination.service';
import { CountMetaDto, FilterMetaDto, PageResponseDto } from '@/shared/utils/bases/base.pagination.dto';
import { DniInterceptor } from '@/shared/interceptors/dni/dni.interceptor';

@ApiTags('Medical>Client', 'Pagination')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('medical/client/doctor')
export class MedicalClientDoctorPaginationController {
  constructor(
    @Inject(MedicalClientDoctorPaginationService) private readonly service: MedicalClientDoctorPaginationService
  ) { }

  @UseInterceptors(DniInterceptor)
  @Get('paginate')
  async find(
    @User() doctor: string,
    @Query() query: FilterMetaDto
  ): Promise<GetMedicalClientArrayResponseDto> {
    const data = await this.service.find(query, doctor);
    return plainToInstance(GetMedicalClientArrayResponseDto, { data });
  }

  @UseInterceptors(DniInterceptor)
  @Get('pages')
  async count(
    @User() doctor: string,
    @Query() query: CountMetaDto
  ): Promise<PageResponseDto> {
    const pages = await this.service.count(query, doctor);
    return plainToInstance(PageResponseDto, { pages });
  }
}
