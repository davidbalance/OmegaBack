import { SqlDatabaseModule } from '@/shared';
import { Module } from '@nestjs/common';
import { MedicalReportValue } from './entities/medical-report-value.entity';
import { MedicalReportValueService } from './medical-report-value.service';
import { MedicalReportValueRepository } from './medical-report-value.repository';

@Module({
    imports: [SqlDatabaseModule.forFeature([MedicalReportValue])],
    providers: [MedicalReportValueService, MedicalReportValueRepository],
    exports: [MedicalReportValueService]
})
export class MedicalValueModule { }
