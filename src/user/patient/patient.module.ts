import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { SqlDatabaseModule } from 'src/shared';
import { Patient } from './entities/patient.entity';
import { PatientRepository } from './patient.repository';
import { UserCredentialModule } from '@/authentication/user-credential/user-credential.module';
import { UserModule } from '../user.module';

@Module({
  imports: [SqlDatabaseModule.forFeature([Patient]), UserModule, UserCredentialModule],
  controllers: [PatientController],
  providers: [PatientService, PatientRepository]
})
export class PatientModule { }
