import { Controller } from '@nestjs/common';
import { MedicalReportService } from './medical-report.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Medical Result')
@ApiBearerAuth()
@Controller('medical-report')
export class MedicalReportController {

  constructor(
    private readonly medicalReportService: MedicalReportService,
  ) { }

}
