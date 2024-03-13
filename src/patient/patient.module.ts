import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { SqlDatabaseModule } from 'src/shared';
import { Patient } from './entities/patient.entity';
import { PatientRepository } from './patient.repository';

@Module({
  imports: [SqlDatabaseModule.forFeature([Patient])],
  controllers: [PatientController],
  providers: [PatientService, PatientRepository]
})
export class PatientModule { }
