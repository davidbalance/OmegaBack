import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SqlDatabaseModule } from './shared';
import { MedicalOrderModule } from './medical-order/medical-order.module';
import { MorbidityModule } from './morbidity/morbidity.module';
import { ReportModule } from './report/report.module';
import { LocationModule } from './location/location.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { UserModule } from './user/user.module';
import { SenderStatusModule } from './sender-status/sender-status.module';
import { OmegaWebModule } from './omega-web/omega-web.module';
import { EventEmitter } from 'stream';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LaboratoryModule } from './laboratory/laboratory.module';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: '.',
      newListener: false,
      removeListener: false,
      maxListeners: 10,
      verboseMemoryLeak: false,
      ignoreErrors: false,
    }),
    SqlDatabaseModule,
    MedicalOrderModule,
    MorbidityModule,
    ReportModule,
    LocationModule,
    UserModule,
    AuthenticationModule,
    AuthorizationModule,
    SenderStatusModule,
    OmegaWebModule,
    LaboratoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
