import { SqlDatabaseModule } from "@/shared/sql-database";
import { MedicalResultDisease } from "./entities/medical-result-disease.entity";
import { MedicalResultExternalKey } from "./entities/medical-result-external-key.entity";
import { MedicalResultSendAttribute } from "./entities/medical-result-send-attribute.entity";
import { MedicalResult } from "./entities/medical-result.entity";
import { Module } from "@nestjs/common";
import { AuthenticationGuardModule } from "@/shared/guards/authentication-guard";
import { MedicalOrderModule } from "../medical-order/medical-order.module";
import { LocalStorageModule } from "@/shared/storage-manager";
import { DniInterceptorModule } from "@/shared/interceptors/dni/dni-interceptor.module";
import { MedicalResultDiseaseManagementService } from "./services/medical-result-disease-management.service";
import { MedicalResultEventService } from "./services/medical-result-event.service";
import { MedicalResultExternalConnectionService } from "./services/medical-result-external-connection.service";
import { MedicalResultExternalKeyService } from "./services/medical-result-external-key.service";
import { MedicalResultFileManagementService } from "./services/medical-result-file-management.service";
import { MedicalResultManagementService } from "./services/medical-result-management.service";
import { MedicalResultSendAttributeService } from "./services/medical-result-send-attribute.service";
import { MedicalResultDiseaseManagementController } from "./controllers/medical-result-disease-management.controller";
import { MedicalResultExternalConnectionController } from "./controllers/medical-result-external-connection.controller";
import { MedicalResultFileManagementController } from "./controllers/medical-result-file-management.controller";
import { MedicalResultManagementController } from "./controllers/medical-result-management.controller";
import { MedicalResultRepository } from "./repositories/medical-result.repository";
import { MedicalResultDiseaseRepository } from "./repositories/medical-result-disease.repository";
import { MedicalResultExternalKeyRepository } from "./repositories/medical-result-external-key.respository";
import { MedicalResultSendAttributeRepository } from "./repositories/medical-result-send-attribute.repository";

@Module({
  imports: [
    SqlDatabaseModule.forFeature([
      MedicalResult,
      MedicalResultDisease,
      MedicalResultExternalKey,
      MedicalResultSendAttribute
    ]),
    AuthenticationGuardModule,
    MedicalOrderModule,
    LocalStorageModule,
    DniInterceptorModule
  ],
  controllers: [
    MedicalResultDiseaseManagementController,
    MedicalResultExternalConnectionController,
    MedicalResultFileManagementController,
    MedicalResultManagementController
  ],
  providers: [
    MedicalResultDiseaseRepository,
    MedicalResultExternalKeyRepository,
    MedicalResultSendAttributeRepository,
    MedicalResultRepository,
    MedicalResultDiseaseManagementService,
    MedicalResultEventService,
    MedicalResultExternalConnectionService,
    MedicalResultExternalKeyService,
    MedicalResultFileManagementService,
    MedicalResultManagementService,
    MedicalResultSendAttributeService
  ],
  exports: [
    MedicalResultManagementService,
    MedicalResultFileManagementService
  ]
})
export class MedicalResultModule { }
