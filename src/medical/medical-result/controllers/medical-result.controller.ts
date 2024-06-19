import { Body, Controller, Get, Param, Patch, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from '@/shared/decorator';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { DniInterceptor } from '@/shared/interceptors/dni/dni.interceptor';
import { MedicalResultService } from '../services/medical-result.service';
import { GETMedicalResultArrayResponseDto, GETMedicalResultResponseDto, PATCHMedicalResultResponseDto } from '../dtos/medical-result.response.dto';
import { POSTMedicalReportRequestDto } from '@/medical/medical-report/dtos/medical-report.request.dto';
import { PATCHMedicalResultWithDiseaseRequestDto } from '../dtos/medical-result.request.dto';

@ApiTags('Medical/Result')
@ApiBearerAuth()
@Controller('medical/results')
export class MedicalResultController {
  constructor(private readonly resultService: MedicalResultService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(): Promise<GETMedicalResultArrayResponseDto> {
    const results = await this.resultService.find();
    return plainToInstance(GETMedicalResultArrayResponseDto, { results: results });
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(DniInterceptor)
  @Get('doctor')
  async findByDoctor(
    @User() user: string
  ): Promise<GETMedicalResultArrayResponseDto> {
    const results = await this.resultService.findResultsByDoctor(user);
    return plainToInstance(GETMedicalResultArrayResponseDto, { results: results });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async findOneResultAndUpdateDisease(
    @Param('id') id: number,
    @Body() body: PATCHMedicalResultWithDiseaseRequestDto
  ): Promise<PATCHMedicalResultResponseDto> {
    await this.resultService.findOneResultAndUpdateDisease(id, body);
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Patch('report/:id')
  async insertMedicalReport(
    @Param('id') id: number,
    @Body() body: POSTMedicalReportRequestDto
  ): Promise<GETMedicalResultResponseDto> {
    const result = await this.resultService.insertMedicalReport(id, body);
    return plainToInstance(GETMedicalResultResponseDto, result);
  }
}
