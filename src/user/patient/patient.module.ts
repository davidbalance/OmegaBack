import { Module } from '@nestjs/common';
import { SqlDatabaseModule } from '@/shared/sql-database';
import { Patient } from './entities/patient.entity';
import { PatientRepository } from './patient.repository';
import { UserModule } from '../user/user.module';
import { PatientExternalConnectionController } from './controller/patient-external-connection.controller';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { EeqPatientPaginationService } from './service/eeq-patient-pagination.service';
import { PatientPaginationService } from './service/patient-pagination.service';
import { ExtraAttributeInterceptorModule } from '@/shared/interceptors/extra-attribute/extra-attribute-interceptor.module';
import { OrderListener } from './listeners/order.listener';
import { PatientExternalConnectionService } from './service/patient-external-connection.service';
import { PatientManagementService } from './service/patient-management.service';
import { PatientManagementController } from './controller/patient-management.controller';
import { EeqPatientPaginationController } from './controller/eeq-patient-pagination.controller';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Patient]),
    UserModule,
    AuthenticationGuardModule,
    ExtraAttributeInterceptorModule
  ],
  controllers: [
    PatientManagementController,
    PatientExternalConnectionController,
    EeqPatientPaginationController
  ],
  providers: [
    PatientManagementService,
    PatientPaginationService,
    EeqPatientPaginationService,
    PatientExternalConnectionService,
    PatientRepository,
    OrderListener,
  ],
  exports: [
    PatientManagementService
  ]
})
export class PatientModule { }
