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
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import serverConfig from './shared/config/server.config';
import authConfig from './shared/config/auth.config';
import clientConfig from './shared/config/client.config';
import databaseConfig from './shared/config/database.config';
import mailOrderConfig from './shared/config/mail-order.config';
import smtpConfig, { SmtpConfig, SmtpConfigName } from './shared/config/smtp.config';
import { MailerModule } from './shared/mailer/mailer.module';
import { BullModule } from '@nestjs/bullmq';
import redisConfig, { RedisConfig, RedisConfigName } from './shared/config/redis.config';

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
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('production', 'development').required(),
        APP_PORT: Joi.number().min(1).required(),
        APP_CLIENT: Joi.string().required(),
        DATABASE_SQL_TYPE: Joi.string().required(),
        DATABASE_SQL_HOST: Joi.string().required(),
        DATABASE_SQL_PORT: Joi.number().required(),
        DATABASE_SQL_USERNAME: Joi.string().required(),
        DATABASE_SQL_PASSWORD: Joi.string().required(),
        DATABASE_SQL_DATABASE: Joi.string().required(),
        JWT_DEFAULT_SECRET: Joi.string().required(),
        JWT_DEFAULT_EXPIRES_IN: Joi.number().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        JWT_REFRESH_EXPIRES_IN: Joi.number().required(),
        APIKEY_EXPIRES_IN: Joi.number().required(),
        SMTP_MAIL_HOST: Joi.string().required(),
        SMTP_MAIL_PORT: Joi.number().required(),
        SMTP_MAIL_SECURE: Joi.boolean().required(),
        SMTP_MAIL_AUTH_USER: Joi.string().required(),
        SMTP_MAIL_AUTH_PASSWORD: Joi.string().required(),
        SMTP_DEFAULT_APP_NAME: Joi.string().required(),
        SMTP_DEFAULT_MAIL_FROM: Joi.string().email().required(),
        CLIENT_KEY: Joi.string().required(),
        MAIL_ORDER_TEMPLATE: Joi.string().required(),
        MAIL_ORDER_NAME: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_POST: Joi.number().required(),
        REDIS_USERNAME: Joi.string().required(),
        REDIS_PASSWORD: Joi.string().required(),
      }),
      load: [
        authConfig,
        clientConfig,
        databaseConfig,
        mailOrderConfig,
        serverConfig,
        smtpConfig,
        redisConfig
      ]
    }),
    MailerModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => config.get<SmtpConfig>(SmtpConfigName)
    }),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const redis = config.get<RedisConfig>(RedisConfigName);
        return {
          connection: {
            host: redis.host,
            port: redis.port,
            username: redis.username,
            password: redis.password
          }
        };
      }
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
