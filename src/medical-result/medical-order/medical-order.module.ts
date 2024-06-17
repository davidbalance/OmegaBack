import { Module } from '@nestjs/common';
import { SqlDatabaseModule } from 'src/shared';
import { UserModule } from '@/user/user/user.module';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { MailerModule } from '@/shared/mailer/mailer.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MedicalOrder } from './entities/medical-order.entity';
import { ExternalKeyModule } from './external-key/external-key.module';
import { MedicalOrderController } from './controllers/medical-order.controller';
import { ExternalConnectionController } from './controllers/external-connection.controller';
import { MedicalOrderService } from './services/medical-order.service';
import { MedicalOrderRepository } from './medical-order.repository';
import { ExternalConnectionService } from './services/external-connection.service';
import { MailAddressModule } from './mail-address/mail-address.module';
import { DniInterceptorModule } from '@/shared/interceptors/dni/dni-interceptor.module';
import { ExtraAttributeInterceptorModule } from '@/shared/interceptors/extra-attribute/extra-attribute-interceptor.module';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([MedicalOrder]),
    UserModule,
    ExternalKeyModule,
    AuthenticationGuardModule,
    DniInterceptorModule,
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
    }),
    MailAddressModule
  ],
  controllers: [
    MedicalOrderController,
    ExternalConnectionController
  ],
  providers: [
    MedicalOrderService,
    MedicalOrderRepository,
    ExternalConnectionService,
  ],
  exports: [
    MedicalOrderService,
    ExternalConnectionService
  ]
})
export class MedicalOrderModule { }
