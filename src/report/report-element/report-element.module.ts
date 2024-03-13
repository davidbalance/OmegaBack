import { Module } from '@nestjs/common';
import { ReportElementService } from './report-element.service';
import { ReportElementController } from './report-element.controller';

@Module({
  controllers: [ReportElementController],
  providers: [ReportElementService]
})
export class ReportElementModule {}
