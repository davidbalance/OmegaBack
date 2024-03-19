import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SqlDatabaseModule } from 'src/shared';
import { Order } from './entities/order.entity';
import { OrderRepository } from './order.repository';
import { PatientModule } from '@/user/patient/patient.module';
import { BranchModule } from '@/location/branch/branch.module';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Order]),
    PatientModule,
    BranchModule
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  exports: [OrderService]
})
export class OrderModule { }
