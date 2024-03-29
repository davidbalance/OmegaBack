import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { SqlDatabaseModule } from 'src/shared';
import { Doctor } from './entities/doctor.entity';
import { DoctorRepository } from './doctor.repository';
import { UserModule } from '../user/user.module';
import { LocalStorageModule } from '@/shared/storage-manager';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Doctor]),
    UserModule,
    LocalStorageModule
  ],
  controllers: [DoctorController],
  providers: [DoctorService, DoctorRepository],
  exports: [DoctorService]
})
export class DoctorModule { }
