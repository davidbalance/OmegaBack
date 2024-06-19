import { Module } from '@nestjs/common';
import { SqlDatabaseModule } from 'src/shared';
import { Doctor } from './entities/doctor.entity';
import { DoctorRepository } from './doctor.repository';
import { UserModule } from '../user/user.module';
import { LocalStorageModule } from '@/shared/storage-manager';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { DoctorController } from './controllers/doctor.controller';
import { DoctorService } from './services/doctor.service';
import { ExternalConnectionController } from './controllers/external-connection.controller';
import { ExternalConnectionService } from './services/external-connection.service';
import { MedicalResultListener } from './listener/medical-result.listener';

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
    DoctorService,
    DoctorRepository,
    ExternalConnectionService,
    MedicalResultListener,
  ],
  exports: [DoctorService]
})
export class DoctorModule { }
