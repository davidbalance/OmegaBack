import { Module } from '@nestjs/common';
import { SqlDatabaseModule } from '@/shared/sql-database/sql-database.module';
import { Doctor } from './entities/doctor.entity';
import { UserModule } from '../user/user.module';
import { LocalStorageModule } from '@/shared/storage-manager';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { DoctorExternalConnectionController } from './controllers/doctor-external-connection.controller';
import { DoctorExternalListener } from './listener/doctor-external.listener';
import { DoctorFileManagementService } from './services/doctor-file-management.service';
import { DoctorManagementService } from './services/doctor-management.service';
import { DoctorExternalConnectionService } from './services/doctor-external-connection.service';
import { DoctorManagementController } from './controllers/doctor-management.controller';
import { DoctorFileManagerController } from './controllers/doctor-file-manager.controller';
import { DoctorRepository } from './repositories/doctor.repository';
import { DoctorFlatService } from './services/doctor-flat.service';
import { DoctorPaginationService } from './services/doctor-pagination.service';
import { DoctorPaginationController } from './controllers/doctor-pagination.controller';

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
    DoctorExternalConnectionController,
    DoctorPaginationController
  ],
  providers: [
    DoctorRepository,
    DoctorExternalConnectionService,
    DoctorFileManagementService,
    DoctorFlatService,
    DoctorManagementService,
    DoctorExternalListener,
    DoctorPaginationService
  ],
  exports: [
    DoctorManagementService,
    DoctorFileManagementService
  ]
})
export class DoctorModule { }
