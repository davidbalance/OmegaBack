import { Module } from '@nestjs/common';
import { ResultModule } from './result/result.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [ResultModule, OrderModule]
})
export class MedicalOrderModule { }
