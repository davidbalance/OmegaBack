import { Controller, Get, Inject, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { GetJobPositionArrayReponseDto } from '../dtos/response/get.job-position-array.dto';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';
import { JobPositionPaginationService } from '../services/job-position-pagination.service';
import { FilterMetaDto, CountMetaDto, PageResponseDto } from '@/shared/utils/bases/base.pagination.dto';

@ApiTags('Location/Job/Position', 'Pagination')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('location/jobposition')
export class JobPositionPaginationController {
  constructor(
    @Inject(JobPositionPaginationService) private readonly service: JobPositionPaginationService
  ) { }

  @Get('paginate')
  async find(
    @Query() query: FilterMetaDto
  ): Promise<GetJobPositionArrayReponseDto> {
    const data = await this.service.find(query);
    return plainToInstance(GetJobPositionArrayReponseDto, { data });
  }

  @Get('pages')
  async count(
    @Query() query: CountMetaDto
  ): Promise<PageResponseDto> {
    const pages = await this.service.count(query);
    return plainToInstance(PageResponseDto, { pages });
  }
}
