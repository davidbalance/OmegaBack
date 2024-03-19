import { Module } from '@nestjs/common';
import { MedicalReportService } from './medical-report.service';
import { MedicalReportController } from './medical-report.controller';
import { SqlDatabaseModule } from 'src/shared';
import { MedicalReport } from './entities/medical-report.entity';
import { MedicalReportRepository } from './medical-report.repository';
import { ResultModule } from '@/medical-order/result/result.module';
import { DoctorModule } from '@/user/doctor/doctor.module';
import { ReportValueModule } from '../report-value/report-value.module';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([MedicalReport]),
    ResultModule,
    ReportValueModule,
    DoctorModule
  ],
  controllers: [MedicalReportController],
  providers: [MedicalReportService, MedicalReportRepository],
  exports: [MedicalReportService]
})
export class MedicalReportModule { }
