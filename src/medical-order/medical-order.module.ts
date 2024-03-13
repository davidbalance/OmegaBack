import { Module } from '@nestjs/common';
import { ResultModule } from './result/result.module';
import { OrderModule } from './order/order.module';
import { SendModule } from './send/send.module';

@Module({
  imports: [ResultModule, OrderModule, SendModule]
})
export class MedicalOrderModule { }
