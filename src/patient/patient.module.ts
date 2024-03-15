import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { SqlDatabaseModule } from 'src/shared';
import { Patient } from './entities/patient.entity';
import { PatientRepository } from './patient.repository';
import { UserModule } from 'src/user/user.module';
import { UserCredentialModule } from 'src/authentication/user-credential/user-credential.module';

@Module({
  imports: [SqlDatabaseModule.forFeature([Patient]), UserModule, UserCredentialModule],
  controllers: [PatientController],
  providers: [PatientService, PatientRepository]
})
export class PatientModule { }
