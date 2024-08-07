import { Module } from '@nestjs/common';
import { SqlDatabaseModule } from '@/shared/sql-database';
import { MedicalClient } from './entities/medical-client.entity';
import { MedicalEmail } from './entities/medical-email.entity';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { MedicalClientRepository } from './repositories/medical-client.repository';
import { MedicalEmailRepository } from './repositories/medical-email.repository';
import { DniInterceptorModule } from '@/shared/interceptors/dni/dni-interceptor.module';
import { MedicalClientController } from './controllers/medical-client.controller';
import { MedicalClientService } from './services/medical-client.service';
import { MedicalClientLocationService } from './services/medical-client-location.service';
import { MedicalClientEmailService } from './services/medical-client-email.service';
import { MedicalClientEmailController } from './controllers/medical-client-email.controller';
import { MedicalClientLocationController } from './controllers/medical-client-location.controller';
import { MedicalClientEventService } from './services/medical-client-event.service';
import { MedicalClientJobPositionController } from './controllers/medical-client-job-position.controller';
import { MedicalClientJobPositionService } from './services/medical-client-job-position.service';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([MedicalClient, MedicalEmail]),
    AuthenticationGuardModule,
    DniInterceptorModule
  ],
  controllers: [
    MedicalClientEmailController,
    MedicalClientJobPositionController,
    MedicalClientLocationController,
    MedicalClientController
  ],
  providers: [
    MedicalClientRepository,
    MedicalEmailRepository,
    MedicalClientEmailService,
    MedicalClientEventService,
    MedicalClientJobPositionService,
    MedicalClientLocationService,
    MedicalClientService,
  ],
  exports: [
    MedicalClientService
  ]
})
export class MedicalClientModule { }
