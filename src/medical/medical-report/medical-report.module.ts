import { Module } from '@nestjs/common';
import { MedicalReportService } from './medical-report.service';
import { PdfManagerModule, SqlDatabaseModule } from 'src/shared';
import { MedicalReport } from './entities/medical-report.entity';
import { MedicalReportRepository } from './medical-report.repository';
import { LocalStorageModule } from '@/shared/storage-manager';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { SendAttributeModule } from './send-attribute/send-attribute.module';
import { MedicalReportController } from './medical-report.controller';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([MedicalReport]),
    LocalStorageModule,
    PdfManagerModule,
    AuthenticationGuardModule,
    SendAttributeModule,
  ],
  controllers: [
    MedicalReportController
  ],
  providers: [
    MedicalReportService,
    MedicalReportRepository,
  ],
  exports: [MedicalReportService]
})
export class MedicalReportModule { }
