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
import { MailerModule } from '@/shared/mailer/mailer.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Order]),
    UserModule,
    OrderExternalKeyModule,
    AuthenticationGuardModule,
    MailerModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        auth: {
          user: config.get<string>('SMTP_MAIL_AUTH_USER'),
          password: config.get<string>('SMTP_MAIL_AUTH_PASSWORD'),
        },
        default: {
          name: config.get<string>('SMTP_DEFAULT_APP_NAME'),
          address: config.get<string>('SMTP_DEFAULT_MAIL_FROM'),
        },
        server: {
          host: config.get<string>('SMTP_MAIL_HOST'),
          port: config.get<number>('SMTP_MAIL_PORT'),
          secure: config.get<boolean>('SMTP_MAIL_SECURE'),
        },
        template: {
          name: 'mail.hbs',
          path: 'templates/mail'
        }
      })
    })
  ],
  controllers: [
    OrderController,
    OrderExternalConnectionController
  ],
  providers: [
    OrderService,
    OrderRepository,
    OrderExternalConnectionService,
  ],
  exports: [
    OrderService,
    OrderExternalConnectionService
  ]
})
export class OrderModule { }
