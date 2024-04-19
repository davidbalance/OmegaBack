import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { SqlDatabaseModule } from 'src/shared';
import { Doctor } from './entities/doctor.entity';
import { DoctorRepository } from './doctor.repository';
import { UserModule } from '../user/user.module';
import { LocalStorageModule } from '@/shared/storage-manager';
import { DoctorExternalConnectionService } from './external-connection/doctor-external-connection.service';
import { DoctorExternalConnectionController } from './external-connection/doctor-external-connection.controller';
import { ResultListener } from './listener';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { AuthorizationGuard } from '@/shared/guards/authorization-guard/authorization.guard';
import { LocalAuthorizationModule } from '@/shared/shared-authorization/local-authorization/local-authorization.module';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Doctor]),
    UserModule,
    LocalStorageModule,
    AuthenticationGuardModule,
    LocalAuthorizationModule
  ],
  controllers: [
    DoctorController,
    DoctorExternalConnectionController
  ],
  providers: [
    DoctorService,
    DoctorRepository,
    DoctorExternalConnectionService,
    ResultListener,
    AuthorizationGuard
  ],
  exports: [DoctorService]
})
export class DoctorModule { }
