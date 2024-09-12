import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { GetJobPositionArrayReponseDto } from '../dtos/response/job-position-array.get.dto';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';
import { JobPositionManagementService } from '../services/job-position-management.service';

@ApiTags('Location>Job Position', 'Options')
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
