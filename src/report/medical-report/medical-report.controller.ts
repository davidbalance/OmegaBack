import { Body, Controller, Post } from '@nestjs/common';
import { MedicalReportService } from './medical-report.service';
import { CreateReportRequestDTO, CreateReportResponseDTO } from '@/shared';

@Controller('medical-report')
export class MedicalReportController {
  constructor(private readonly medicalReportService: MedicalReportService) { }

  @Post()
  async create(
    @Body() body: CreateReportRequestDTO
  ): Promise<CreateReportResponseDTO> {
    await this.medicalReportService.create(body);
    return;
  }
}
