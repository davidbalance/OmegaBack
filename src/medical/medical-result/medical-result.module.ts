import { DiseaseModule } from "@/disease/disease.module";
import { CompanyModule } from "@/location/company/company.module";
import { AuthenticationGuardModule } from "@/shared/guards/authentication-guard";
import { DniInterceptorModule } from "@/shared/interceptors/dni/dni-interceptor.module";
import { LocalStorageModule } from "@/shared/storage-manager";
import { DoctorModule } from "@/user/doctor/doctor.module";
import { PatientModule } from "@/user/patient/patient.module";
import { Module } from "@nestjs/common";
import { MedicalReportModule } from "../medical-report/medical-report.module";
import { MedicalResult } from "./entities/result.entity";
import { ExternalKeyModule } from "./external-key/external-key.module";
import { SendAttributeModule } from "./send-attribute/send-attribute.module";
import { MedicalResultController } from "./controllers/medical-result.controller";
import { ExternalConnectionController } from "./controllers/external-connection.controller";
import { MedicalResultService } from "./services/medical-result.service";
import { ExternalConnectionService } from "./services/external-connection.service";
import { MedicalResultRepository } from "./repositories/medical-result.repository";
import { MedicalOrderModule } from "../medical-order/medical-order.module";
import { MedicalResultDisease } from "./entities/result-disease.entity";
import { MedicalResultDiseaseRepository } from "./repositories/medical-result-disease.repository";
import { SqlDatabaseModule } from "@/shared/sql-database";

@Module({
  imports: [
    SqlDatabaseModule.forFeature([MedicalResult, MedicalResultDisease]),
    DoctorModule,
    PatientModule,
    CompanyModule,
    MedicalReportModule,
    MedicalOrderModule,
    DiseaseModule,
    ExternalKeyModule,
    LocalStorageModule,
    AuthenticationGuardModule,
    SendAttributeModule,
    DniInterceptorModule
  ],
  controllers: [
    MedicalResultController,
    ExternalConnectionController
  ],
  providers: [
    MedicalResultService,
    MedicalResultRepository,
    MedicalResultDiseaseRepository,
    ExternalConnectionService,
  ],
  exports: [MedicalResultService]
})
export class MedicalResultModule { }
