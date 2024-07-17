import { Module } from '@nestjs/common';
import { SqlDatabaseModule } from 'src/shared';
import { Patient } from './entities/patient.entity';
import { PatientRepository } from './patient.repository';
import { UserModule } from '../user/user.module';
import { PatientExternalConnectionController } from './controller/external-connection.controller';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { PatientExternalConnectionService } from './service/patient-external-connection.service';
import { PatientController } from './controller/patient.controller';
import { PatientManagementService } from './service/patient-management.service';
import { ExtraAttributeInterceptorModule } from '@/shared/interceptors/extra-attribute/extra-attribute-interceptor.module';
import { OrderListener } from './listeners/order.listener';
import { EeqPatientController } from './controller/eeq-patient.controller';
import { EeqPatientPaginationService } from './service/eeq-patient-pagination.service';
import { PatientPaginationService } from './service/patient-pagination.service';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Patient]),
    UserModule,
    AuthenticationGuardModule,
    ExtraAttributeInterceptorModule
  ],
  controllers: [
    PatientController,
    PatientExternalConnectionController,
    EeqPatientController
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
