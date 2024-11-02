import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DiseaseModule } from './disease/disease.module';
import { LocationModule } from './location/location.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import { OmegaWebModule } from './omega-web/omega-web.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LaboratoryModule } from './laboratory/laboratory.module';
import { PdfManagerModule } from './shared/pdf-manager/pdf-manager.module';
import { ApiKeyGuardModule } from './shared/guards/api-key-guard/api-key-guard.module';
import { LoggerMiddleware } from './shared/middleware';
import { HealthCheckModule } from './shared/health-status/health-check.module';
import { MedicalModule } from './medical/medical.module';
import { LoggerModule } from './shared/logger';
import { SqlDatabaseModule } from './shared/sql-database/sql-database.module';
import { SessionModule } from './session/session.module';
import { NestPathModule } from './shared/nest-ext/nest-path/nest-path.module';
import { NestFSModule } from './shared/nest-ext/nest-fs/nest-fs.module';

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
    LoggerModule,
    SqlDatabaseModule,
    DiseaseModule,
    LocationModule,
    UserModule,
    AuthenticationModule,
    OmegaWebModule,
    LaboratoryModule,
    MedicalModule,
    PdfManagerModule,
    ApiKeyGuardModule,
    HealthCheckModule,
    SessionModule,
    NestPathModule,
    NestFSModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
