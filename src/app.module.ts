import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SqlDatabaseModule } from './shared';
import { DiseaseModule } from './disease/disease.module';
import { LocationModule } from './location/location.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { UserModule } from './user/user.module';
import { OmegaWebModule } from './omega-web/omega-web.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LaboratoryModule } from './laboratory/laboratory.module';
import { MedicalResultModule } from './medical-result/medical-result.module';
import { PdfManagerModule } from './shared/pdf-manager/pdf-manager.module';
import { AuthenticationGuardModule } from './shared/guards/authentication-guard/authentication-guard.module';

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
    DiseaseModule,
    LocationModule,
    UserModule,
    AuthenticationModule,
    AuthorizationModule,
    OmegaWebModule,
    LaboratoryModule,
    MedicalResultModule,
    PdfManagerModule,
    AuthenticationGuardModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
