import { Module } from '@nestjs/common';
import { SqlDatabaseModule } from '@/shared/sql-database/sql-database.module';
import { UserModule } from '../user/user.module';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { DoctorExternalConnectionController } from './controllers/doctor-external-connection.controller';
import { DoctorExternalListener } from './listener/doctor-external.listener';
import { DoctorFileManagementService } from './services/doctor-file-management.service';
import { DoctorManagementService } from './services/doctor-management.service';
import { DoctorExternalConnectionService } from './services/doctor-external-connection.service';
import { DoctorFileManagerController } from './controllers/doctor-file-manager.controller';
import { DoctorRepository } from './repositories/doctor.repository';
import { DoctorPaginationService } from './services/doctor-pagination.service';
import { DoctorPaginationController } from './controllers/doctor-pagination.controller';
import { DoctorEntity } from './entities/doctor.entity';
import { PathModule } from '@/shared/nest-ext/path/path.module';
import { DoctorOptionController } from './controllers/doctor-option.controller';
import { DoctorOptionService } from './services/doctor-option.service';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([
      DoctorEntity
    ]),
    UserModule,
    AuthenticationGuardModule,
    PathModule
  ],
  controllers: [
    DoctorExternalConnectionController,
    DoctorFileManagerController,
    DoctorOptionController,
    DoctorPaginationController
  ],
  providers: [
    DoctorRepository,
    DoctorExternalListener,
    DoctorExternalConnectionService,
    DoctorFileManagementService,
    DoctorManagementService,
    DoctorOptionService,
    DoctorPaginationService
  ],
  exports: [
    DoctorManagementService,
    DoctorFileManagementService
  ]
})
export class DoctorModule { }
