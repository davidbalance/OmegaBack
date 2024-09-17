import { SqlDatabaseModule } from "@/shared/sql-database/sql-database.module";
import { Module } from "@nestjs/common";
import { AuthenticationGuardModule } from "@/shared/guards/authentication-guard";
import { MedicalOrderModule } from "../medical-order/medical-order.module";
import { LocalStorageModule } from "@/shared/storage-manager";
import { DniInterceptorModule } from "@/shared/interceptors/dni/dni-interceptor.module";
import { MedicalResultDiseaseManagementService } from "./services/medical-result-disease-management.service";
import { MedicalResultEventService } from "./services/medical-result-event.service";
import { MedicalResultExternalConnectionProvider, MedicalResultExternalConnectionService } from "./services/medical-result-external-connection.service";
import { MedicalResultExternalKeyService } from "./services/medical-result-external-key.service";
import { MedicalResultFileManagementService } from "./services/medical-result-file-management.service";
import { MedicalResultManagementService } from "./services/medical-result-management.service";
import { MedicalResultDiseaseManagementController } from "./controllers/medical-result-disease-management.controller";
import { MedicalResultExternalConnectionController } from "./controllers/medical-result-external-connection.controller";
import { MedicalResultFileManagementController } from "./controllers/medical-result-file-management.controller";
import { MedicalResultRepository } from "./repositories/medical-result.repository";
import { MedicalResultDiseaseRepository } from "./repositories/medical-result-disease.repository";
import { MedicalResultExternalKeyRepository } from "./repositories/medical-result-external-key.respository";
import { MedicalResultDiseaseReportService } from "./services/medical-result-disease-report.service";
import { ExcelManagerModule } from "@/shared/excel-manager/excel-manager.module";
import { MedicalResultDiseaseReportController } from "./controllers/medical-result-disease-report.controller";
import { MedicalResultEntity } from "./entities/medical-result.entity";
import { MedicalResultDiseaseEntity } from "./entities/medical-result-disease.entity";
import { MedicalResultExternalKeyEntity } from "./entities/medical-result-external-key.entity";
import { MedicalResultDoctorPaginationController } from "./controllers/medical-result-doctor-pagination.controller";
import { MedicalResultPaginationController } from "./controllers/medical-result-pagination.controller";
import { MedicalResultDoctorPaginationService } from "./services/medical-result-doctor-pagination.service";
import { MedicalResultPaginationService } from "./services/medical-result-pagination.service";
import { MedicalDiseaseManagementController } from "./controllers/medical-disease-management.controller";
import { MedicalResultManagementController } from "./controllers/medical-result-management.controller";
import { MedicalResultReportService } from "./services/medical-result-report.service";
import { MedicalResultReportController } from "./controllers/medical-result-report.controller";
import { UrlFileFetcherModule } from "@/shared/url-file-fetcher/url-file-fetcher.module";

@Module({
  imports: [
    SqlDatabaseModule.forFeature([
      MedicalResultEntity,
      MedicalResultDiseaseEntity,
      MedicalResultExternalKeyEntity
    ]),
    AuthenticationGuardModule,
    MedicalOrderModule,
    LocalStorageModule,
    DniInterceptorModule,
    ExcelManagerModule,
    UrlFileFetcherModule
  ],
  controllers: [
    MedicalDiseaseManagementController,
    MedicalResultDoctorPaginationController,
    MedicalResultDiseaseManagementController,
    MedicalResultDiseaseReportController,
    MedicalResultExternalConnectionController,
    MedicalResultFileManagementController,
    MedicalResultManagementController,
    MedicalResultPaginationController,
    MedicalResultReportController
  ],
  providers: [
    MedicalResultDiseaseRepository,
    MedicalResultExternalKeyRepository,
    MedicalResultRepository,
    MedicalResultDiseaseManagementService,
    MedicalResultDiseaseReportService,
    MedicalResultDoctorPaginationService,
    MedicalResultEventService,
    MedicalResultExternalConnectionService,
    MedicalResultExternalConnectionProvider,
    MedicalResultExternalKeyService,
    MedicalResultFileManagementService,
    MedicalResultManagementService,
    MedicalResultPaginationService,
    MedicalResultReportService,
  ],
  exports: [
    MedicalResultManagementService,
    MedicalResultFileManagementService,
    MedicalResultDiseaseReportService,
    MedicalResultExternalConnectionProvider
  ]
})
export class MedicalResultModule { }
