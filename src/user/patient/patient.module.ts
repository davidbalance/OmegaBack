import { Module } from '@nestjs/common';
import { SqlDatabaseModule } from 'src/shared';
import { Patient } from './entities/patient.entity';
import { PatientRepository } from './patient.repository';
import { UserModule } from '../user/user.module';
import { PatientExternalConnectionController } from './controller/external-connection.controller';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { PatientController } from './controller/patient.controller';
import { PatientService } from './service/patient.service';
import { ExternalConnectionService } from './service/external-connection.service';
import { ExtraAttributeInterceptorModule } from '@/shared/interceptors/extra-attribute/extra-attribute-interceptor.module';
import { OrderListener } from './listeners/order.listener';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Patient]),
    UserModule,
    AuthenticationGuardModule,
    ExtraAttributeInterceptorModule
  ],
  controllers: [
    PatientController,
    PatientExternalConnectionController
  ],
  providers: [
    PatientService,
    PatientRepository,
    ExternalConnectionService,
    OrderListener,
  ],
  exports: [PatientService]
})
export class PatientModule { }
