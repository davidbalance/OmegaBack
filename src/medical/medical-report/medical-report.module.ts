import { SqlDatabaseModule } from "@/shared/sql-database/sql-database.module";
import { Module } from "@nestjs/common";
import { LocalStorageModule } from "@/shared/storage-manager";
import { AuthenticationGuardModule } from "@/shared/guards/authentication-guard";
import { MedicalReportPdfController } from "./controllers/medical-report-pdf.controller";
import { MedicalReportManagementService } from "./services/medical-report-management.service";
import { MedicalReportRepository } from "./repositories/medical-report.repository";
import { MedicalReportPdfService } from "./services/medical-report-pdf.service";
import { MedicalReportFileManagementService } from "./services/medical-report-file-management.service";
import { MedicalResultModule } from "../medical-result/medical-result.module";
import { MedicalReportManagementController } from "./controllers/medical-report-management.controller";
import { MedicalReportFileManagementController } from "./controllers/medical-report-file-management.controller";
import { PdfManagerModule } from "@/shared/pdf-manager/pdf-manager.module";
import { MedicalReportEntity } from "./entities/medical-report.entity";

@Module({
  imports: [
    SqlDatabaseModule.forFeature([
      MedicalReportEntity
    ]),
    AuthenticationGuardModule,
    MedicalResultModule,
    LocalStorageModule,
    PdfManagerModule
  ],
  controllers: [
    MedicalReportFileManagementController,
    MedicalReportManagementController,
    MedicalReportPdfController
  ],
  providers: [
    MedicalReportRepository,
    MedicalReportFileManagementService,
    MedicalReportManagementService,
    MedicalReportPdfService,
  ],
  exports: [
    MedicalReportManagementService,
    MedicalReportFileManagementService
  ]
})
export class MedicalReportModule { }
