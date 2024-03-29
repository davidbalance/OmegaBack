import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { SqlDatabaseModule } from 'src/shared';
import { Result } from './entities/result.entity';
import { ResultRepository } from './repositories/result.repository';
import { LocalStorageSaverModule } from '@/shared/storage-manager';
import { DoctorModule } from '@/user/doctor/doctor.module';
import { OrderModule } from '../order/order.module';
import { ExamModule } from '@/exam/exam.module';
import { MorbidityModule } from '@/morbidity/morbidity/morbidity.module';
import { ResultSendStatus } from './entities/result-send-status.entity';
import { ResultSendStatusService } from './result-send-status.service';
import { ResultSendStatusRepositoryRepository } from './repositories/result-send-status.repository';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([
      Result,
      ResultSendStatus
    ]),
    LocalStorageSaverModule,
    DoctorModule,
    OrderModule,
    ExamModule,
    MorbidityModule
  ],
  controllers: [ResultController],
  providers: [
    ResultService,
    ResultRepository,
    ResultSendStatusService,
    ResultSendStatusRepositoryRepository
  ],
  exports: [ResultService]
})
export class ResultModule { }
