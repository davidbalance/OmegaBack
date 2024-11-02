import { Module } from '@nestjs/common';
import { SqlDatabaseModule } from '@/shared/sql-database/sql-database.module';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { MedicalClientRepository } from './repositories/medical-client.repository';
import { MedicalEmailRepository } from './repositories/medical-email.repository';
import { UserInterceptorModule } from '@/shared/interceptors/dni/user-interceptor.module';
import { MedicalClientLocationService } from './services/medical-client-location.service';
import { MedicalClientEmailService } from './services/medical-client-email.service';
import { MedicalClientEmailController } from './controllers/medical-client-email.controller';
import { MedicalClientLocationController } from './controllers/medical-client-location.controller';
import { MedicalClientEventService } from './services/medical-client-event.service';
import { MedicalClientJobPositionController } from './controllers/medical-client-job-position.controller';
import { MedicalClientJobPositionService } from './services/medical-client-job-position.service';
import { MedicalClientManagementService } from './services/medical-client-management.service';
import { MedicalClientExternalService } from './services/medical-client-external.service';
import { MedicalClientExternalListener } from './listeners/medical-client-external.listener';
import { MedicalClientEntity } from './entities/medical-client.entity';
import { MedicalEmailEntity } from './entities/medical-email.entity';
import { MedicalClientDoctorPaginationController } from './controllers/medical-client-doctor-pagination.controller';
import { MedicalClientDoctorPaginationService } from './services/medical-client-doctor-pagination.service';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([
      MedicalClientEntity,
      MedicalEmailEntity
    ]),
    AuthenticationGuardModule,
    UserInterceptorModule
  ],
  controllers: [
    MedicalClientDoctorPaginationController,
    MedicalClientEmailController,
    MedicalClientJobPositionController,
    MedicalClientLocationController,
  ],
  providers: [
    MedicalClientRepository,
    MedicalEmailRepository,
    MedicalClientExternalListener,
    MedicalClientDoctorPaginationService,
    MedicalClientEmailService,
    MedicalClientEventService,
    MedicalClientExternalService,
    MedicalClientJobPositionService,
    MedicalClientLocationService,
    MedicalClientManagementService,
  ],
  exports: [
    MedicalClientManagementService,
    MedicalClientExternalService
  ]
})
export class MedicalClientModule { }
