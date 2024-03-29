import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { SqlDatabaseModule } from 'src/shared';
import { Patient } from './entities/patient.entity';
import { PatientRepository } from './patient.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Patient]),
    UserModule
  ],
  controllers: [PatientController],
  providers: [
    PatientService,
    PatientRepository
  ],
  exports: [PatientService]
})
export class PatientModule { }
