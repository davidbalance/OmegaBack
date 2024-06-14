import { Body, Controller, Get, Param, Patch, UseGuards, UseInterceptors } from '@nestjs/common';
import { ResultService } from './result.service';
import { FindOneResultAndUpdateDiseaseRequestDTO, InsertMedicalReportRequestDTO } from '../common/dtos/result.request.dto';
import { User } from '@/shared/decorator';
import { plainToInstance } from 'class-transformer';
import { FindOneResultAndUpdateDiseaseResponseDTO, FindResultResponseDTO, FindResultsResponseDTO } from '../common/dtos';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { DniInterceptor } from '@/shared/interceptors/dni/dni.interceptor';

@ApiTags('Medical Result')
@ApiBearerAuth()
@Controller('results')
export class ResultController {
  constructor(private readonly resultService: ResultService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(): Promise<FindResultsResponseDTO> {
    const results = await this.resultService.find();
    return plainToInstance(FindResultsResponseDTO, { results: results });
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(DniInterceptor)
  @Get('doctor')
  async findByDoctor(
    @User() user: string
  ): Promise<FindResultsResponseDTO> {
    const results = await this.resultService.findResultsByDoctor(user);
    return plainToInstance(FindResultsResponseDTO, { results: results });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async findOneResultAndUpdateDisease(
    @Param('id') id: number,
    @Body() body: FindOneResultAndUpdateDiseaseRequestDTO
  ): Promise<FindOneResultAndUpdateDiseaseResponseDTO> {
    await this.resultService.findOneResultAndUpdateDisease(id, body);
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Patch('report/:id')
  async insertMedicalReport(
    @Param('id') id: number,
    @Body() body: InsertMedicalReportRequestDTO
  ): Promise<FindResultResponseDTO> {
    const result = await this.resultService.insertMedicalReport(id, body);
    return plainToInstance(FindResultResponseDTO, result);
  }
}
