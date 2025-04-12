<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { PrismaModule } from './adapter/persistence/prisma/prisma.module';
import { DiseaseModule } from './disease/disease.module';
import { LaboratoryModule } from './laboratory/laboratory.module';
import { LocationModule } from './location/location.module';
import { MedicalModule } from './medical/medical.module';
import { ProfileModule } from './profile/profile.module';
import { AuthProxyModule } from './adapter/proxy/auth-proxy/auth-proxy.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import serverConfig from './_setup/config/server.config';
import serverSchema from './_setup/config/server.schema';
import { ZodValidatorFactory } from '@shared/shared/nest/factories';
import { AttributeProxyModule } from './adapter/proxy/attribute_proxy/attribute_proxy.module';
import { WinstonModule } from '@db-logger/db-logger';
import { HeartBeatModule } from '@heart-beat/heart-beat';
import { ApiKeyProxyModule } from './adapter/proxy/api-key-proxy/api-key-proxy.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
=======
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
import { SqlDatabaseModule } from './shared/sql-database';
>>>>>>> main

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validate: ZodValidatorFactory(serverSchema),
      load: [serverConfig]
    }),
<<<<<<< HEAD
    EventEmitterModule.forRoot({ verboseMemoryLeak: true }),
    PrismaModule,
    WinstonModule,
    HeartBeatModule,
    AuthProxyModule,
    ApiKeyProxyModule,
    AttributeProxyModule,
    AuthModule,
    DiseaseModule,
    LaboratoryModule,
    LocationModule,
    MedicalModule,
    ProfileModule
  ],
=======
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
    HealthCheckModule
  ]
>>>>>>> main
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
