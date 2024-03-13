import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { SqlDatabaseModule } from 'src/shared';
import { Doctor } from './entities/doctor.entity';
import { DoctorRepository } from './doctor.repository';

@Module({
  imports: [SqlDatabaseModule.forFeature([Doctor])],
  controllers: [DoctorController],
  providers: [DoctorService, DoctorRepository]
})
export class DoctorModule { }
