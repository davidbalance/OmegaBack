import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SqlDatabaseModule } from 'src/shared';
import { Order } from './entities/order.entity';
import { OrderRepository } from './order.repository';
import { BranchModule } from '@/location/branch/branch.module';
import { CompanyModule } from '@/location/company/company.module';
import { CorporativeGroupModule } from '@/location/corporative-group/corporative-group.module';
import { UserModule } from '@/user/user/user.module';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Order]),
    CompanyModule,
    CorporativeGroupModule,
    UserModule,
    BranchModule
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  exports: [OrderService]
})
export class OrderModule { }
