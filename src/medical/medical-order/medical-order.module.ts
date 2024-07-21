import { AuthenticationGuardModule } from "@/shared/guards/authentication-guard";
import { DniInterceptorModule } from "@/shared/interceptors/dni/dni-interceptor.module";
import { MailerModule } from "@/shared/mailer/mailer.module";
import { SqlDatabaseModule } from "@/shared/sql-database";
import { UserModule } from "@/user/user.module";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MedicalClientModule } from "../medical-client/medical-client.module";
import { MedicalOrderExternalConnectionController } from "./controllers/medical-order-external-connection.controller";
import { MedicalOrderManagementController } from "./controllers/medical-order-management.controller";
import { MedicalOrder } from "./entities/medical-order.entity";
import { MedicalOrderExternalConnectionService } from "./services/medical-order-external-connection.service";
import { MedicalOrderExternalKey } from "./entities/medical-order-external-key.entity";
import { MedicalOrderManagementService } from "./services/medical-order-management.service";
import { MedicalOrderEventService } from "./services/medical-order-event.service";
import { MedicalOrderExternalKeyService } from "./services/medical-order-external-key.service";
import { MedicalOrderMailService } from "./services/medical-order-mail.service";
import { PlainMedicalOrderPaginationService } from "./services/plain-medical-order-pagination.service";
import { MedicalOrderExternalKeyRepository } from "./repositories/medical-order-external-key.repository";
import { MedicalOrderRepository } from "./repositories/medical-order.repository";
import { MedicalOrderCloudController } from "./controllers/medical-order-cloud.controller";
import { MedicalOrderMaitController } from "./controllers/medical-order-mail.controller";
import { MedicalOrderPaginationController } from "./controllers/medical-order-pagination.controller";

@Module({
  imports: [
    SqlDatabaseModule.forFeature([MedicalOrder, MedicalOrderExternalKey]),
    UserModule,
    AuthenticationGuardModule,
    DniInterceptorModule,
    MedicalClientModule,
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
  ],
  controllers: [
    MedicalOrderCloudController,
    MedicalOrderExternalConnectionController,
    MedicalOrderMaitController,
    MedicalOrderManagementController,
    MedicalOrderPaginationController
  ],
  providers: [
    MedicalOrderExternalKeyRepository,
    MedicalOrderRepository,
    MedicalOrderEventService,
    MedicalOrderExternalConnectionService,
    MedicalOrderExternalKeyService,
    MedicalOrderMailService,
    MedicalOrderManagementService,
    PlainMedicalOrderPaginationService
  ],
  exports: [
    MedicalOrderManagementService,
    MedicalOrderExternalConnectionService
  ]
})
export class MedicalOrderModule { }
