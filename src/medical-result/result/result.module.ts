import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { SqlDatabaseModule } from 'src/shared';
import { DoctorModule } from '@/user/doctor/doctor.module';
import { OrderModule } from '../order/order.module';
import { DiseaseModule } from '@/disease/disease/disease.module';
import { Result } from './entities/result.entity';
import { ResultRepository } from './result.repository';
import { PatientModule } from '@/user/patient/patient.module';
import { MedicalReportModule } from '../medical-report/medical-report.module';
import { CompanyModule } from '@/location/company/company.module';
import { ResultExternalKeyModule } from './result-external-key/result-external-key.module';
import { ResultExternalConnectionService } from './external-connections/result-external-connection.service';
import { ResultExternalConnectionController } from './external-connections/result-external-connection.controller';
import { LocalStorageModule } from '@/shared/storage-manager';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { ResultSendAttributeModule } from './result-send-attribute/result-send-attribute.module';
import { AuthorizationGuard } from '@/shared/guards/authorization-guard/authorization.guard';
import { LocalAuthorizationModule } from '@/shared/shared-authorization/local-authorization/local-authorization.module';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Result]),
    DoctorModule,
    PatientModule,
    CompanyModule,
    MedicalReportModule,
    OrderModule,
    DiseaseModule,
    ResultExternalKeyModule,
    OrderModule,
    LocalStorageModule,
    AuthenticationGuardModule,
    ResultSendAttributeModule,
    LocalAuthorizationModule
  ],
  controllers: [
    ResultController,
    ResultExternalConnectionController
  ],
  providers: [
    ResultService,
    ResultRepository,
    ResultExternalConnectionService,
    AuthorizationGuard
  ],
  exports: [ResultService]
})
export class ResultModule { }
