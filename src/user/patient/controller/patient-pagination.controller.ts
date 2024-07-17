import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { PatientPaginationService } from '../service/patient-pagination.service';
import { GETPatientPaginationRequestDto, GETPatientPaginationResponseDto } from '../dtos/get.patient-pagination.dto';

@ApiTags('User/Patient')
@ApiBearerAuth()
@Controller('patients')
@UseGuards(JwtAuthGuard)
export class PatientPaginationController {
  constructor(
    @Inject(PatientPaginationService) private readonly patientService: PatientPaginationService
  ) { }

  @Post('paginate')
  async findByFilterAndPagination(
    @Body() { page, limit, filter, order }: GETPatientPaginationRequestDto
  ): Promise<GETPatientPaginationResponseDto> {
    const [pages, data] = await this.patientService.findPaginatedDataAndPageCount(page, limit, filter, order);
    return plainToInstance(GETPatientPaginationResponseDto, { data, pages });
  }
}
