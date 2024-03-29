import { Module } from '@nestjs/common';
import { MedicalReportService } from './medical-report.service';
import { MedicalReportController } from './medical-report.controller';
import { SqlDatabaseModule } from 'src/shared';
import { MedicalValueModule } from './medical-value/medical-value.module';
import { MedicalReport } from './entities/medical-report.entity';
import { MedicalReportRepository } from './medical-report.repository';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([MedicalReport]),
    MedicalValueModule
  ],
  controllers: [MedicalReportController],
  providers: [
    MedicalReportService,
    MedicalReportRepository
  ],
  exports: [MedicalReportService]
})
export class MedicalReportModule { }
