import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SqlDatabaseModule } from './shared';
import { MorbidityModule } from './morbidity/morbidity.module';
import { LocationModule } from './location/location.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { UserModule } from './user/user.module';
import { OmegaWebModule } from './omega-web/omega-web.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LaboratoryModule } from './laboratory/laboratory.module';
import { MedicalResultModule } from './medical-result/medical-result.module';

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
    MorbidityModule,
    LocationModule,
    UserModule,
    AuthenticationModule,
    AuthorizationModule,
    OmegaWebModule,
    LaboratoryModule,
    MedicalResultModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
