import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { EeqPatientPaginationService } from '../service/eeq-patient-pagination.service';
import { GETEeqPatientPaginationRequestDto, GETEeqPatientPaginationResponseDto } from '../dtos/get.eeq-patient-pagination.dto';

@ApiTags('User/Patient/EEQ')
@ApiBearerAuth()
@Controller('patients/eeq')
export class EeqPatientPaginationController {
  constructor(
    @Inject(EeqPatientPaginationService) private readonly patientService: EeqPatientPaginationService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post('paginate')
  async findByFilterAndPagination(
    @Body() { page, limit, filter, order }: GETEeqPatientPaginationRequestDto
  ): Promise<GETEeqPatientPaginationResponseDto> {
    const [pages, data] = await this.patientService.findPaginatedDataAndPageCount(page, limit, filter, order);
    return plainToInstance(GETEeqPatientPaginationResponseDto, { pages, data });
  }
}
