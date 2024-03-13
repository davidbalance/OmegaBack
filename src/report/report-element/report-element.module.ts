import { Module } from '@nestjs/common';
import { ReportElementService } from './report-element.service';
import { ReportElementController } from './report-element.controller';
import { SqlDatabaseModule } from 'src/shared';
import { ReportElement } from './entities/report-element.entity';
import { ReportElementRepository } from './report-element.repository';

@Module({
  imports: [SqlDatabaseModule.forFeature([ReportElement])],
  controllers: [ReportElementController],
  providers: [ReportElementService, ReportElementRepository]
})
export class ReportElementModule { }
