import { Body, Controller, Post } from '@nestjs/common';
import { MedicalReportService } from './medical-report.service';
import { CreateMedicalReportRequestDTO } from '../common/dtos';
import { CreateMedicalReportResponseDTO } from '../common/dtos/medical-report.response.dto';

@Controller('medical-report')
export class MedicalReportController {
  
  constructor(private readonly medicalReportService: MedicalReportService) { }

  @Post()
  async create(
    @Body() body: CreateMedicalReportRequestDTO
  ): Promise<CreateMedicalReportResponseDTO> {
    await this.medicalReportService.create(body);
    return;
  }
}
