import { Module } from '@nestjs/common';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { UserModule as SystemUserModule } from './user/user.module';

@Module({
    imports: [PatientModule, DoctorModule, SystemUserModule]
})
export class UserModule { }
