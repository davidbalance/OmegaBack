import { Module } from '@nestjs/common';
import { SqlDatabaseModule } from 'src/shared';
import { Doctor } from './entities/doctor.entity';
import { DoctorRepository } from './doctor.repository';
import { UserModule } from '../user/user.module';
import { LocalStorageModule } from '@/shared/storage-manager';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { DoctorController } from './controllers/doctor.controller';
import { ExternalConnectionController } from './controllers/external-connection.controller';
import { MedicalResultListener } from './listener/medical-result.listener';
import { DoctorFileManagementService } from './services/doctor-file-management.service';
import { DoctorManagementService } from './services/doctor-management.service';
import { DoctorExternalConnectionService } from './services/doctor-external-connection.service';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Doctor]),
    UserModule,
    LocalStorageModule,
    AuthenticationGuardModule,
  ],
  controllers: [
    DoctorController,
    ExternalConnectionController
  ],
  providers: [
    DoctorManagementService,
    DoctorFileManagementService,
    DoctorExternalConnectionService,
    DoctorRepository,
    MedicalResultListener,
  ],
  exports: [
    DoctorManagementService,
    DoctorFileManagementService
  ]
})
export class DoctorModule { }
