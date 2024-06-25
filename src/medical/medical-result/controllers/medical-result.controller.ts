import { Body, Controller, Get, Param, Patch, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from '@/shared/decorator';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { DniInterceptor } from '@/shared/interceptors/dni/dni.interceptor';
import { MedicalResultService } from '../services/medical-result.service';
import { GETMedicalResultArrayResponseDto, GETMedicalResultResponseDto, PATCHMedicalResultFileResponseDto, PATCHMedicalResultResponseDto } from '../dtos/medical-result.response.dto';
import { PATCHMedicalReportRequestDto, POSTMedicalReportRequestDto } from '@/medical/medical-report/dtos/medical-report.request.dto';
import { PATCHMedicalResultFileRequestDto, PATCHMedicalResultWithDiseaseRequestDto } from '../dtos/medical-result.request.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard)
  @Patch('file/:id')
  @UseInterceptors(FileInterceptor('file'))
  async findOneResultAndUploadFile(
    @Param('id') id: number,
    @Body() _: PATCHMedicalResultFileRequestDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<PATCHMedicalResultFileResponseDto> {
    await this.resultService.findOneResultAndUploadFile(id, file);
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Patch('report/:id')
  async insertMedicalReport(
    @Param('id') id: number,
    @Body() body: PATCHMedicalReportRequestDto
  ): Promise<GETMedicalResultResponseDto> {
    const result = await this.resultService.insertMedicalReport(id, body);
    return plainToInstance(GETMedicalResultResponseDto, result);
  }


}
