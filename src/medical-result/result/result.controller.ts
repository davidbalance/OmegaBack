import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ResultService } from './result.service';
import { FindOneResultAndUpdateDiseaseRequestDTO, InsertMedicalReportRequestDTO } from '../common/dtos/result.request.dto';
import { User } from '@/shared/decorator';
import { plainToInstance } from 'class-transformer';
import { FindOneResultAndUpdateDiseaseResponseDTO, FindResultResponseDTO, FindResultsResponseDTO } from '../common/dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Medical Result')
@Controller('results')
export class ResultController {
  constructor(private readonly resultService: ResultService) { }

  @Get()
  async find(): Promise<FindResultsResponseDTO> {
    const results = await this.resultService.find();
    return plainToInstance(FindResultsResponseDTO, { results: results });
  }

  @Get('doctor')
  async findByDoctor(
    @User() user: number
  ): Promise<FindResultsResponseDTO> {
    const results = await this.resultService.findResultsByDoctor(user);
    return plainToInstance(FindResultsResponseDTO, { results: results });
  }

  @Patch(':id')
  async findOneResultAndUpdateDisease(
    @Param('id') id: number,
    @Body() body: FindOneResultAndUpdateDiseaseRequestDTO
  ): Promise<FindOneResultAndUpdateDiseaseResponseDTO> {
    await this.resultService.findOneResultAndUpdateDisease(id, body);
    return {};
  }

  @Patch('report/:id')
  async insertMedicalReport(
    @Param('id') id: number,
    @Body() body: InsertMedicalReportRequestDTO
  ): Promise<FindResultResponseDTO> {
    const result = await this.resultService.insertMedicalReport(id, body);
    return plainToInstance(FindResultResponseDTO, result);
  }
}
