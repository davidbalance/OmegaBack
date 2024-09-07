import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { GetPatientEeqArrayResponseDto } from '../dtos/response/patient-eeq-array.get.dto';
import { PatientEeqPaginationService } from '../service/patient-eeq-pagination.service';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';
import { CountMetaDto, FilterMetaDto, PageResponseDto } from '@/shared/utils/bases/base.pagination.dto';

@ApiTags('User/Patient/EEQ', 'Pagination')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('patients/eeq')
export class PatientEeqPaginationController {
  constructor(
    @Inject(PatientEeqPaginationService) private readonly service: PatientEeqPaginationService
  ) { }

  @Get('paginate')
  async find(
    @Query() query: FilterMetaDto
  ): Promise<GetPatientEeqArrayResponseDto> {
    const [pages, data] = await this.service.find(query);
    return plainToInstance(GetPatientEeqArrayResponseDto, { pages, data });
  }

  @Get('pages')
  async count(
    @Query() query: CountMetaDto
  ): Promise<PageResponseDto> {
    const pages = await this.service.count(query);
    return plainToInstance(PageResponseDto, { pages });
  }
}