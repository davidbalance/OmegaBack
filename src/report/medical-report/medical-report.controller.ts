import { Controller } from '@nestjs/common';
import { MedicalReportService } from './medical-report.service';

@Controller('medical-report')
export class MedicalReportController {
  constructor(private readonly medicalReportService: MedicalReportService) { }
}
