import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { GetPatientEeqArrayResponseDto } from '../dtos/response/get.patient-eeq-array.response.dto';
import { PatientEeqPaginationService } from '../service/patient-eeq-pagination.service';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';
import { CountMetaDto, FilterMetaDto } from '@/shared/utils/bases/base.pagination.dto';
import { PostPatientPagesResponseDto } from '../dtos/response/post.patient-pagination.response.dto';

@ApiTags('User/Patient/EEQ')
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
  ): Promise<PostPatientPagesResponseDto> {
    const pages = await this.service.count(query);
    return plainToInstance(PostPatientPagesResponseDto, { pages });
  }
}