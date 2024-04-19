import { Module } from '@nestjs/common';
import { MedicalReportService } from './medical-report.service';
import { MedicalReportController } from './medical-report.controller';
import { PdfManagerModule, SqlDatabaseModule } from 'src/shared';
import { MedicalReport } from './entities/medical-report.entity';
import { MedicalReportRepository } from './medical-report.repository';
import { LocalStorageModule } from '@/shared/storage-manager';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { MedicalReportSendAttributeModule } from './medical-report-send-attribute/medical-report-send-attribute.module';
import { AuthorizationGuard } from '@/shared/guards/authorization-guard/authorization.guard';
import { LocalAuthorizationModule } from '@/shared/shared-authorization/local-authorization/local-authorization.module';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([MedicalReport]),
    LocalStorageModule,
    PdfManagerModule,
    AuthenticationGuardModule,
    MedicalReportSendAttributeModule,
    LocalAuthorizationModule
  ],
  controllers: [MedicalReportController],
  providers: [
    MedicalReportService,
    MedicalReportRepository,
    AuthorizationGuard
  ],
  exports: [MedicalReportService]
})
export class MedicalReportModule { }
