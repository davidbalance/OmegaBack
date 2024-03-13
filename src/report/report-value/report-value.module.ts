import { Module } from '@nestjs/common';
import { ReportValueService } from './report-value.service';
import { ReportValueController } from './report-value.controller';
import { SqlDatabaseModule } from 'src/shared';
import { ReportValue } from './entities/report-value.entity';

@Module({
  imports: [SqlDatabaseModule.forFeature([ReportValue])],
  controllers: [ReportValueController],
  providers: [ReportValueService]
})
export class ReportValueModule { }
