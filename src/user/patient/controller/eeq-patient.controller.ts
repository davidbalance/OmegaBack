import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { GETPatientByFilterAndPaginationRequestDto } from '../dtos/patient.request.dto';
import { EeqPatientService } from '../service/eeq-patient.service';
import { GETEEQPatientArrayResponseDto, GETEEQPatientArrayWithPageCountResponseDto } from '../dtos/eeq-patient.response.dto';

@ApiTags('User/Patient/EEQ')
@ApiBearerAuth()
@Controller('patients/eeq')
export class EeqPatientController {
  constructor(
    @Inject(EeqPatientService) private readonly patientService: EeqPatientService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(): Promise<GETEEQPatientArrayResponseDto> {
    const patients = await this.patientService.find();
    return plainToInstance(GETEEQPatientArrayResponseDto, { patients });
  }

  @UseGuards(JwtAuthGuard)
  @Post('paginate')
  async findByFilterAndPagination(
    @Body() { page, limit, filter, order }: GETPatientByFilterAndPaginationRequestDto
  ): Promise<GETEEQPatientArrayWithPageCountResponseDto> {
    const patients = await this.patientService.findByFilterAndPagination(page, limit, filter, order);
    const pages = await this.patientService.findByPageCount(limit, filter);
    return plainToInstance(GETEEQPatientArrayWithPageCountResponseDto, { patients, pages });
  }
}
