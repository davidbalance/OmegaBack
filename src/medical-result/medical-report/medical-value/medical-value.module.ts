import { SqlDatabaseModule } from '@/shared';
import { Module } from '@nestjs/common';
import { MedicalReportValue } from './entities/medical-report-value.entity';
import { MedicalReportService } from '../medical-report.service';
import { MedicalReportRepository } from '../medical-report.repository';

@Module({
    imports: [SqlDatabaseModule.forFeature([MedicalReportValue])],
    providers: [MedicalReportService, MedicalReportRepository],
    exports: [MedicalReportService]
})
export class MedicalValueModule { }
