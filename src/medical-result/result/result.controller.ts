import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ResultService } from './result.service';
import { FindOneResultAndUpdateDiseaseRequestDTO, InsertMedicalReportRequestDTO } from '../common/dtos/result.request.dto';
import { FindOneResultAndUpdateDiseaseResponseDTO, FindResultsByDoctorResponseDTO, InsertMedicalReportResponseDTO } from '../common/dtos';

@Controller('results')
export class ResultController {
  constructor(private readonly resultService: ResultService) { }

  @Patch(':id')
  async findOneResultAndUpdateDisease(
    @Param('id')id: number,
    @Body() body: FindOneResultAndUpdateDiseaseRequestDTO
  ): Promise<FindOneResultAndUpdateDiseaseResponseDTO> {
    await this.resultService.findOneResultAndUpdateDisease(id, body);
    return;
  }

  @Get('doctor/:doctor')
  async find(
    @Param('doctor') doctor: number
  ): Promise<FindResultsByDoctorResponseDTO> {
    const results = await this.resultService.findResultsByDoctor(doctor);
    return { results }
  }

  @Patch('report/:id')
  async insertMedicalReport(
    @Param('id') id: number,
    @Body() body: InsertMedicalReportRequestDTO
  ): Promise<InsertMedicalReportResponseDTO> {
    const result = await this.resultService.insertMedicalReport(id, body);
    return { result };
  }
}
