import { AuthenticationGuardModule } from "@/shared/guards/authentication-guard";
import { UserInterceptorModule } from "@/shared/interceptors/dni/user-interceptor.module";
import { MailerModule } from "@/shared/mailer/mailer.module";
import { SqlDatabaseModule } from "@/shared/sql-database/sql-database.module";
import { UserModule } from "@/user/user.module";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MedicalClientModule } from "../medical-client/medical-client.module";
import { MedicalOrderExternalConnectionController } from "./controllers/medical-order-external-connection.controller";
import { MedicalOrderManagementService } from "./services/medical-order-management.service";
import { MedicalOrderEventService } from "./services/medical-order-event.service";
import { MedicalOrderExternalKeyService } from "./services/medical-order-external-key.service";
import { MedicalOrderMailService } from "./services/medical-order-mail.service";
import { MedicalOrderExternalKeyRepository } from "./repositories/medical-order-external-key.repository";
import { MedicalOrderRepository } from "./repositories/medical-order.repository";
import { MedicalOrderCloudController } from "./controllers/medical-order-cloud.controller";
import { MedicalOrderMailController } from "./controllers/medical-order-mail.controller";
import { MedicalOrderPaginationController } from "./controllers/medical-order-pagination.controller";
import { MedicalOrderCloudService } from "./services/medical-order-cloud.service";
import { MedicalOrderStatusController } from "./controllers/medical-order-status.controller";
import { MedicalOrderPaginationService } from "./services/medical-order-pagination.service";
import { MedicalOrderEntity } from "./entities/medical-order.entity";
import { MedicalOrderExternalKeyEntity } from "./entities/medical-order-external-key.entity";
import { MedicalOrderDoctorPaginationController } from "./controllers/medical-order-doctor-pagination.controller";
import { MedicalOrderDoctorPaginationService } from "./services/medical-order-doctor-pagination.service";
import { MedicalOrderExpandedPaginationService } from "./services/medical-order-expanded-pagination.service";
import { MedicalOrderExternalConnectionProvider, MedicalOrderExternalConnectionService } from "./services/medical-order-external-connection.service";
import { MedicalOrderExpandedPaginationController } from "./controllers/medical-order-expanded-pagination.controller";
import { LocalStorageModule } from "@/shared/storage-manager";
import { Base64Module } from "@/shared/base64/base64.module";
import { MedicalOrderProcessController } from "./controllers/medical-order-process.controller";
import { MedicalOrderProcessService } from "./services/medical-order-process.service";
import { NestHandlebarsModule } from "@/shared/nest-ext/nest-handlebars/nest-handlebars.module";
import { HandlebarsModule } from "@/shared/handlebars/handlebars.module";
import { MailOrderConfig, MailOrderConfigName } from "@/shared/config/mail-order.config";

@Module({
  imports: [
    SqlDatabaseModule.forFeature([
      MedicalOrderEntity,
      MedicalOrderExternalKeyEntity
    ]),
    UserModule,
    AuthenticationGuardModule,
    UserInterceptorModule,
    MedicalClientModule,
    LocalStorageModule,
    Base64Module,
    NestHandlebarsModule,
    HandlebarsModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => config.get<MailOrderConfig>(MailOrderConfigName)
    })
  ],
  controllers: [
    MedicalOrderCloudController,
    MedicalOrderDoctorPaginationController,
    MedicalOrderExpandedPaginationController,
    MedicalOrderExternalConnectionController,
    MedicalOrderMailController,
    MedicalOrderPaginationController,
    MedicalOrderStatusController,
    MedicalOrderProcessController
  ],
  providers: [
    MedicalOrderExternalKeyRepository,
    MedicalOrderRepository,
    MedicalOrderCloudService,
    MedicalOrderDoctorPaginationService,
    MedicalOrderEventService,
    MedicalOrderExpandedPaginationService,
    MedicalOrderExternalConnectionService,
    MedicalOrderExternalConnectionProvider,
    MedicalOrderExternalKeyService,
    MedicalOrderMailService,
    MedicalOrderManagementService,
    MedicalOrderPaginationService,
    MedicalOrderProcessService
  ],
  exports: [
    MedicalOrderExternalConnectionProvider,
    MedicalOrderManagementService
  ]
})
export class MedicalOrderModule { }
