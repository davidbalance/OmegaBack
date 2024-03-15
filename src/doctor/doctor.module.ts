import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { SqlDatabaseModule } from 'src/shared';
import { Doctor } from './entities/doctor.entity';
import { DoctorRepository } from './doctor.repository';
import { UserModule } from 'src/user/user.module';
import { UserCredentialModule } from 'src/authentication/user-credential/user-credential.module';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Doctor]),
    UserModule,
    UserCredentialModule
  ],
  controllers: [DoctorController],
  providers: [DoctorService, DoctorRepository]
})
export class DoctorModule { }
