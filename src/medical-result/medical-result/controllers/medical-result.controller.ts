import { Body, Controller, Get, Param, Patch, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from '@/shared/decorator';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { DniInterceptor } from '@/shared/interceptors/dni/dni.interceptor';
import { MedicalResultService } from '../services/medical-result.service';
import { GETMedicalResultArrayResponseDTO, GETMedicalResultResponseDTO, PATCHMedicalResultResponseDTO } from '@/medical-result/common/dtos';
import { PATCHMedicalResultWithDiseaseRequestDTO, POSTMedicalReportRequestDTO } from '@/medical-result/common/dtos/result.request.dto';

@ApiTags('Medical/Result')
@ApiBearerAuth()
@Controller('medical/results')
export class MedicalResultController {
  constructor(private readonly resultService: MedicalResultService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(): Promise<GETMedicalResultArrayResponseDTO> {
    const results = await this.resultService.find();
    return plainToInstance(GETMedicalResultArrayResponseDTO, { results: results });
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(DniInterceptor)
  @Get('doctor')
  async findByDoctor(
    @User() user: string
  ): Promise<GETMedicalResultArrayResponseDTO> {
    const results = await this.resultService.findResultsByDoctor(user);
    return plainToInstance(GETMedicalResultArrayResponseDTO, { results: results });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async findOneResultAndUpdateDisease(
    @Param('id') id: number,
    @Body() body: PATCHMedicalResultWithDiseaseRequestDTO
  ): Promise<PATCHMedicalResultResponseDTO> {
    await this.resultService.findOneResultAndUpdateDisease(id, body);
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Patch('report/:id')
  async insertMedicalReport(
    @Param('id') id: number,
    @Body() body: POSTMedicalReportRequestDTO
  ): Promise<GETMedicalResultResponseDTO> {
    const result = await this.resultService.insertMedicalReport(id, body);
    return plainToInstance(GETMedicalResultResponseDTO, result);
  }
}
