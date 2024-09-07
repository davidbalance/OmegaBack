import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetDoctorArrayResponseDto } from '../dtos/response/doctor-array.get.dto';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';
import { DoctorPaginationService } from '../services/doctor-pagination.service';
import { FilterMetaDto, CountMetaDto, PageResponseDto } from '@/shared/utils/bases/base.pagination.dto';

@ApiTags('User/Doctor', 'Pagination')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user/doctors')
export class DoctorPaginationController {
  constructor(
    @Inject(DoctorPaginationService) private readonly service: DoctorPaginationService
  ) { }

  @Get('paginate')
  async find(
    @Query() query: FilterMetaDto
  ): Promise<GetDoctorArrayResponseDto> {
    const data = await this.service.find(query);
    return plainToInstance(GetDoctorArrayResponseDto, { data });
  }

  @Get('pages')
  async count(
    @Query() query: CountMetaDto
  ): Promise<PageResponseDto> {
    const pages = await this.service.count(query);
    return plainToInstance(PageResponseDto, { pages });
  }
}
