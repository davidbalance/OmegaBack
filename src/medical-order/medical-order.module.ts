import { Module } from '@nestjs/common';
import { ResultModule } from './result/result.module';
import { OrderModule } from './order/order.module';
import { ProcessModule } from './process/process.module';

@Module({
  imports: [ResultModule, OrderModule, ProcessModule]
})
export class MedicalOrderModule { }
