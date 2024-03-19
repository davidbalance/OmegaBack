import { Controller } from '@nestjs/common';
import { ReportValueService } from './report-value.service';

@Controller('report-value')
export class ReportValueController {
  constructor(private readonly reportValueService: ReportValueService) { }
}
