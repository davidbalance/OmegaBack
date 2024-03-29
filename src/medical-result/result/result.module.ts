import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { SqlDatabaseModule } from 'src/shared';
import { DoctorModule } from '@/user/doctor/doctor.module';
import { OrderModule } from '../order/order.module';
import { MorbidityModule } from '@/morbidity/morbidity/morbidity.module';
import { Result } from './entities/result.entity';
import { ResultRepository } from './result.repository';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Result]),
    DoctorModule,
    OrderModule,
    MorbidityModule
  ],
  controllers: [ResultController],
  providers: [
    ResultService,
    ResultRepository
  ],
  exports: [ResultService]
})
export class ResultModule { }
