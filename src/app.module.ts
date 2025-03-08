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

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validate: ZodValidatorFactory(serverSchema),
      load: [serverConfig]
    }),
    PrismaModule,
    WinstonModule,
    HeartBeatModule,
    AuthProxyModule,
    AttributeProxyModule,
    AuthModule,
    DiseaseModule,
    LaboratoryModule,
    LocationModule,
    MedicalModule,
    ProfileModule
  ],
})
export class AppModule { }
