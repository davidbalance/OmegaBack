import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { PatientPaginationService } from '../service/patient-pagination.service';
import { PostPatientPagesResponseDto } from '../dtos/response/post.patient-pagination.response.dto';
import { GetPatientArrayResponseDto } from '../dtos/response/get.patient-array.response.dto';
import { CountMetaDto, FilterMetaDto } from '@/shared/utils/bases/base.pagination.dto';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';

@ApiTags('User/Patient', 'Pagination')
@ApiBearerAuth()
@Controller('user/patients')
@UseGuards(JwtAuthGuard)
export class PatientPaginationController {
  constructor(
    @Inject(PatientPaginationService) private readonly service: PatientPaginationService
  ) { }

  @Get('paginate')
  async find(
    @Query() query: FilterMetaDto
  ): Promise<GetPatientArrayResponseDto> {
    const data = await this.service.find(query);
    return plainToInstance(GetPatientArrayResponseDto, { data });
  }

  @Get('pages')
  async count(
    @Query() query: CountMetaDto
  ): Promise<PostPatientPagesResponseDto> {
    const pages = await this.service.count(query);
    return plainToInstance(PostPatientPagesResponseDto, { pages });
  }
}
