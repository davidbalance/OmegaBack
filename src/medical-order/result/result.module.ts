import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { SqlDatabaseModule } from 'src/shared';
import { Result } from './entities/result.entity';
import { ResultRepository } from './result.repository';
import { LocalStorageSaverModule } from '@/shared/storage-saver';
import { DoctorModule } from '@/user/doctor/doctor.module';
import { OrderModule } from '../order/order.module';
import { ExamModule } from '@/exam/exam.module';
import { MorbidityModule } from '@/morbidity/morbidity/morbidity.module';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Result]),
    LocalStorageSaverModule,
    DoctorModule,
    OrderModule,
    ExamModule,
    MorbidityModule
  ],
  controllers: [ResultController],
  providers: [ResultService, ResultRepository],
  exports: [ResultService]
})
export class ResultModule { }
