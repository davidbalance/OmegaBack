import { Module } from '@nestjs/common';
import { ReportValueService } from './report-value.service';
import { ReportValueController } from './report-value.controller';
import { SqlDatabaseModule } from 'src/shared';
import { ReportValue } from './entities/report-value.entity';
import { ReportValueRepository } from './report-value.repository';

@Module({
  imports: [SqlDatabaseModule.forFeature([ReportValue])],
  controllers: [ReportValueController],
  providers: [ReportValueService, ReportValueRepository],
  exports: [ReportValueService]
})
export class ReportValueModule { }
