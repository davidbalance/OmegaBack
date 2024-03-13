import { Module } from '@nestjs/common';
import { MedicalReportModule } from './medical-report/medical-report.module';
import { ReportValueModule } from './report-value/report-value.module';
import { ReportElementModule } from './report-element/report-element.module';

@Module({
  imports: [MedicalReportModule, ReportValueModule, ReportElementModule]
})
export class ReportModule {}
