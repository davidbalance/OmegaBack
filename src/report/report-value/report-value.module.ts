import { Module } from '@nestjs/common';
import { ReportValueService } from './report-value.service';
import { ReportValueController } from './report-value.controller';

@Module({
  controllers: [ReportValueController],
  providers: [ReportValueService]
})
export class ReportValueModule {}
