import { Module } from '@nestjs/common';
import { ReportElementService } from './report-element.service';
import { ReportElementController } from './report-element.controller';
import { SqlDatabaseModule } from 'src/shared';
import { ReportElement } from './entities/report-element.entity';

@Module({
  imports: [SqlDatabaseModule.forFeature([ReportElement])],
  controllers: [ReportElementController],
  providers: [ReportElementService]
})
export class ReportElementModule { }
