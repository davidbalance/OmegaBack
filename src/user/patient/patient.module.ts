import { Module } from '@nestjs/common';
import { SqlDatabaseModule } from '@/shared/sql-database';
import { Patient } from './entities/patient.entity';
import { PatientRepository } from './repositories/patient.repository';
import { UserModule } from '../user/user.module';
import { PatientExternalConnectionController } from './controllers/patient-external-connection.controller';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { ExtraAttributeInterceptorModule } from '@/shared/interceptors/extra-attribute/extra-attribute-interceptor.module';
import { PatientEeqPaginationController } from './controllers/patient-eeq-pagination.controller';
import { PatientManagementController } from './controllers/patient-management.controller';
import { PatientExternalListener } from './listeners/patient-external.listener';
import { PatientExternalConnectionService } from './service/patient-external-connection.service';
import { PatientManagementService } from './service/patient-management.service';
import { PatientPaginationService } from './service/patient-pagination.service';
import { PatientEeqPaginationService } from './service/patient-eeq-pagination.service';
import { PatientFlatProvider } from './service/patient-flat.service';
import { PatientEeqFlatProvider } from './service/patient-eeq-flat.service';
import { PatientPaginationController } from './controllers/patient-pagination.controller';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Patient]),
    UserModule,
    AuthenticationGuardModule,
    ExtraAttributeInterceptorModule
  ],
  controllers: [
    PatientEeqPaginationController,
    PatientExternalConnectionController,
    PatientManagementController,
    PatientPaginationController,
  ],
  providers: [
    PatientRepository,
    PatientEeqPaginationService,
    PatientExternalConnectionService,
    PatientManagementService,
    PatientPaginationService,
    PatientExternalListener,
    PatientFlatProvider,
    PatientEeqFlatProvider
  ],
  exports: [
    PatientManagementService
  ]
})
export class PatientModule { }
