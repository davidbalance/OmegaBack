import { Module } from '@nestjs/common';
import { PatientRepository } from './repositories/patient.repository';
import { UserModule } from '../user/user.module';
import { PatientExternalConnectionController } from './controllers/patient-external-connection.controller';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { ExtraAttributeInterceptorModule } from '@/shared/interceptors/extra-attribute/extra-attribute-interceptor.module';
import { PatientEeqPaginationController } from './controllers/patient-eeq-pagination.controller';
import { PatientExternalListener } from './listeners/patient-external.listener';
import { PatientExternalConnectionService } from './service/patient-external-connection.service';
import { PatientManagementService } from './service/patient-management.service';
import { PatientPaginationService } from './service/patient-pagination.service';
import { PatientEeqPaginationService } from './service/patient-eeq-pagination.service';
import { PatientPaginationController } from './controllers/patient-pagination.controller';
import { PatientEventService } from './service/patient-event.service';
import { SqlDatabaseModule } from '@/shared/sql-database/sql-database.module';
import { PatientEntity } from './entities/patient.entity';
import { PatientLookForCompanyPaginationController } from './controllers/patient-look-for-company-pagination.controller';
import { PatientLookForCompanyPaginationService } from './service/patient-look-for-company-pagination.service';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([
      PatientEntity
    ]),
    UserModule,
    AuthenticationGuardModule,
    ExtraAttributeInterceptorModule
  ],
  controllers: [
    PatientEeqPaginationController,
    PatientExternalConnectionController,
    PatientLookForCompanyPaginationController,
    PatientPaginationController,
  ],
  providers: [
    PatientRepository,
    PatientExternalListener,
    PatientEeqPaginationService,
    PatientEventService,
    PatientExternalConnectionService,
    PatientLookForCompanyPaginationService,
    PatientManagementService,
    PatientPaginationService
  ],
  exports: [
    PatientManagementService
  ]
})
export class PatientModule { }
