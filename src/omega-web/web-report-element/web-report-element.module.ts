import { Module } from '@nestjs/common';
import { WebReportElementService } from './web-report-element.service';
import { WebReportElementController } from './web-report-element.controller';
import { WebReportElement } from './entities/web-report-element.entity';
import { SqlDatabaseModule } from '@/shared';
import { WebReportElementRepository } from './web-report-element.repository.dto';

@Module({
  imports: [SqlDatabaseModule.forFeature([WebReportElement])],
  controllers: [WebReportElementController],
  providers: [
    WebReportElementService,
    WebReportElementRepository
  ]
})
export class WebReportElementModule { }
