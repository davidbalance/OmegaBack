import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ResultService } from './result.service';
import { FindOneResultAndUpdateDiseaseRequestDTO, InsertMedicalReportRequestDTO } from '../common/dtos/result.request.dto';
import { User } from '@/shared/decorator';
import { plainToInstance } from 'class-transformer';
import { FindOneResultAndUpdateDiseaseResponseDTO, FindResultResponseDTO, FindResultsResponseDTO } from '../common/dtos';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';

@ApiTags('Medical Result')
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
  @Get('doctor')
  async findByDoctor(
    @User() user: number
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
