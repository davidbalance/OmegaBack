import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SqlDatabaseModule } from 'src/shared';
import { Order } from './entities/order.entity';
import { OrderRepository } from './order.repository';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Order])
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository]
})
export class OrderModule { }
