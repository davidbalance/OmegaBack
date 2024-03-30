import { Module } from '@nestjs/common';
import { MedicalReportService } from './medical-report.service';
import { MedicalReportController } from './medical-report.controller';
import { PdfManagerModule, SqlDatabaseModule } from 'src/shared';
import { MedicalReport } from './entities/medical-report.entity';
import { MedicalReportRepository } from './medical-report.repository';
import { LocalStorageModule } from '@/shared/storage-manager';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([MedicalReport]),
    LocalStorageModule,
    PdfManagerModule
  ],
  controllers: [MedicalReportController],
  providers: [
    MedicalReportService,
    MedicalReportRepository
  ],
  exports: [MedicalReportService]
})
export class MedicalReportModule { }
