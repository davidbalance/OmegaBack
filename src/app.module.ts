import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SqlDatabaseModule } from './shared';
import { MedicalOrderModule } from './medical-order/medical-order.module';
import { MorbidityModule } from './morbidity/morbidity.module';
import { ExamModule } from './exam/exam.module';
import { ReportModule } from './report/report.module';
import { LocationModule } from './location/location.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { UserModule } from './user/user.module';
import { SenderStatusModule } from './sender-status/sender-status.module';
import { OmegaWebModule } from './omega-web/omega-web.module';

@Module({
  imports: [
    SqlDatabaseModule,
    MedicalOrderModule,
    MorbidityModule,
    ExamModule,
    ReportModule,
    LocationModule,
    UserModule,
    AuthenticationModule,
    AuthorizationModule,
    SenderStatusModule,
    OmegaWebModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
