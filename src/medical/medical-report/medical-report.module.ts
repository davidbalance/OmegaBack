import { SqlDatabaseModule } from "@/shared/sql-database";
import { Module } from "@nestjs/common";
import { MedicalReport } from "./entities/medical-report.entity";
import { MedicalReportSendAttribute } from "./entities/medical-report-send-attribute.entity";
import { LocalStorageModule } from "@/shared/storage-manager";
import { PdfManagerModule } from "@/shared/pdf-manager";
import { AuthenticationGuardModule } from "@/shared/guards/authentication-guard";
import { MedicalReportPdfController } from "./controllers/medical-report-pdf.controller";
import { MedicalReportManagementService } from "./services/medical-report-management.service";
import { MedicalReportRepository } from "./repositories/medical-report.repository";
import { MedicalReportSendAttributeRepository } from "./repositories/medical-report-send-attribute.repository";
import { MedicalReportSendService } from "./services/medical-report-send.service";
import { MedicalReportPdfService } from "./services/medical-report-pdf.service";
import { MedicalReportFileManagementService } from "./services/medical-report-file-management.service";

@Module({
  imports: [
    SqlDatabaseModule.forFeature([MedicalReport, MedicalReportSendAttribute]),
    AuthenticationGuardModule,
    LocalStorageModule,
    PdfManagerModule
  ],
  controllers: [
    MedicalReportPdfController
  ],
  providers: [
    MedicalReportRepository,
    MedicalReportManagementService,
    MedicalReportSendAttributeRepository,
    MedicalReportSendService,
    MedicalReportPdfService,
    MedicalReportFileManagementService
  ],
  exports: [
    MedicalReportManagementService
  ]
})
export class MedicalReportModule { }
