import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { SqlDatabaseModule } from 'src/shared';
import { Patient } from './entities/patient.entity';
import { PatientRepository } from './patient.repository';
import { UserModule } from '../user/user.module';
import { PatientExternalConnectionService } from './external-connection/patient-external-connection.service';
import { PatientExternalConnectionController } from './external-connection/patient-external-connection.controller';
import { OrderListener } from './listeners';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Patient]),
    UserModule,
    AuthenticationGuardModule,
  ],
  controllers: [
    PatientController,
    PatientExternalConnectionController
  ],
  providers: [
    PatientService,
    PatientRepository,
    PatientExternalConnectionService,
    OrderListener,
  ],
  exports: [PatientService]
})
export class PatientModule { }
