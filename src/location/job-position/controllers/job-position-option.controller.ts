import { Controller, Get, Inject, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { GetJobPositionArrayReponseDto } from '../dtos/response/job-position-array.get.dto';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';
import { JobPositionPaginationService } from '../services/job-position-pagination.service';
import { FilterMetaDto, CountMetaDto, PageResponseDto } from '@/shared/utils/bases/base.pagination.dto';
import { JobPositionManagementService } from '../services/job-position-management.service';

@ApiTags('Location>Job Position', 'Option')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('location/jobposition/options')
export class JobPositionOptionController {
  constructor(
    @Inject(JobPositionManagementService) private readonly service: JobPositionManagementService
  ) { }

  @Get()
  async find(): Promise<GetJobPositionArrayReponseDto> {
    const data = await this.service.find();
    return plainToInstance(GetJobPositionArrayReponseDto, { data });
  }
}
