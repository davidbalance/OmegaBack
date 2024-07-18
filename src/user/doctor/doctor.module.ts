import { Module } from '@nestjs/common';
import { SqlDatabaseModule } from '@/shared/sql-database';
import { Doctor } from './entities/doctor.entity';
import { UserModule } from '../user/user.module';
import { LocalStorageModule } from '@/shared/storage-manager';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { DoctorExternalConnectionController } from './controllers/doctor-external-connection.controller';
import { MedicalResultDoctorListener } from './listener/medical-result-doctor.listener';
import { DoctorFileManagementService } from './services/doctor-file-management.service';
import { DoctorManagementService } from './services/doctor-management.service';
import { DoctorExternalConnectionService } from './services/doctor-external-connection.service';
import { DoctorManagementController } from './controllers/doctor-management.controller';
import { DoctorFileManagerController } from './controllers/doctor-file-manager.controller';
import { DoctorRepository } from './repositories/doctor.repository';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Doctor]),
    UserModule,
    LocalStorageModule,
    AuthenticationGuardModule,
  ],
  controllers: [
    DoctorManagementController,
    DoctorFileManagerController,
    DoctorExternalConnectionController
  ],
  providers: [
    DoctorManagementService,
    DoctorFileManagementService,
    DoctorExternalConnectionService,
    DoctorRepository,
    MedicalResultDoctorListener,
  ],
  exports: [
    DoctorManagementService,
    DoctorFileManagementService
  ]
})
export class DoctorModule { }
