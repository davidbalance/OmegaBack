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

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Doctor]),
    UserModule,
    LocalStorageModule
  ],
  controllers: [
    DoctorController,
    DoctorExternalConnectionController
  ],
  providers: [
    DoctorService,
    DoctorRepository,
    DoctorExternalConnectionService,
    ResultListener
  ],
  exports: [DoctorService]
})
export class DoctorModule { }
