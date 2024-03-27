import { Controller, Get } from '@nestjs/common';
import { ReportElementService } from './report-element.service';
import { FindMedicalReportElementResponseDTO } from '@/shared';

@Controller('report-element')
export class ReportElementController {
  constructor(private readonly reportElementService: ReportElementService) { }

  @Get()
  async find(): Promise<FindMedicalReportElementResponseDTO> {
    const elements = await this.reportElementService.find();
    return { elements };
  }
}
