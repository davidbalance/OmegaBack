import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SqlDatabaseModule } from 'src/shared';
import { Order } from './entities/order.entity';
import { OrderRepository } from './order.repository';
import { UserModule } from '@/user/user/user.module';
import { OrderExternalKeyModule } from './order-external-key/order-external-key.module';
import { OrderExternalConnectionService } from './external-connections/order-external-connection.service';
import { OrderExternalConnectionController } from './external-connections/order-external-connection.controller';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { LocalAuthorizationModule } from '@/shared/shared-authorization/local-authorization/local-authorization.module';
import { AuthorizationGuard } from '@/shared/guards/authorization-guard/authorization.guard';
import { MailModule } from '@/shared/mail/mail.module';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Order]),
    UserModule,
    OrderExternalKeyModule,
    AuthenticationGuardModule,
    LocalAuthorizationModule,
    MailModule
  ],
  controllers: [
    OrderController,
    OrderExternalConnectionController
  ],
  providers: [
    OrderService,
    OrderRepository,
    OrderExternalConnectionService,
    AuthorizationGuard
  ],
  exports: [
    OrderService,
    OrderExternalConnectionService
  ]
})
export class OrderModule { }
