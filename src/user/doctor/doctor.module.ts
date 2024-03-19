import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { SqlDatabaseModule } from 'src/shared';
import { Doctor } from './entities/doctor.entity';
import { DoctorRepository } from './doctor.repository';
import { UserCredentialModule } from 'src/authentication/user-credential/user-credential.module';
import { LocalStorageSaverModule } from 'src/shared/storage-saver';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Doctor]),
    UserModule,
    UserCredentialModule,
    LocalStorageSaverModule
  ],
  controllers: [DoctorController],
  providers: [DoctorService, DoctorRepository],
  exports: [DoctorService]
})
export class DoctorModule { }
