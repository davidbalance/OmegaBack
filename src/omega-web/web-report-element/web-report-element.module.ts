import { Module } from '@nestjs/common';
import { WebReportElementService } from './web-report-element.service';
import { WebReportElementController } from './web-report-element.controller';

@Module({
  controllers: [WebReportElementController],
  providers: [WebReportElementService]
})
export class WebReportElementModule {}
