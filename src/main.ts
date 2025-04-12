import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
<<<<<<< HEAD
import { setupLogger } from './_setup/helper/setup-logger.helper';
import { ConfigService } from '@nestjs/config';
import { ServerConfig, ServerConfigName } from './_setup/config/server.config';
import { setupGlobalPipesAndInterceptors } from './_setup/helper/setup-global-pipes-and-interceptors.helper';
import { setupApiReference } from './_setup/helper/setup-api-reference.helper';
import { DomainErrorFilter } from '@shared/shared/nest/filters';
import { Logger } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupGlobalPipesAndInterceptors(app);
  setupLogger(app);
  setupApiReference(app);

  app.useGlobalFilters(new DomainErrorFilter())

  const configService = app.get(ConfigService);
  const serverConfig = configService.getOrThrow<ServerConfig>(ServerConfigName);

  app.use(express.json({ limit: '1mb' }));

  const logger = app.get<Logger>(WINSTON_MODULE_NEST_PROVIDER);
  await app.listen(serverConfig.port, serverConfig.network);
  logger.debug(`Running in port: http://${serverConfig.network}:${serverConfig.port}`);
  if (serverConfig.nodeEnv === 'development') {
    logger.debug(`API Reference running in http://${serverConfig.network}:${serverConfig.port}/reference`);
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
=======
import { ClassSerializerInterceptor, INestApplication, Logger, LoggerService, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { WinstonLoggerConfig } from './shared/logger/config/winston-logger.config';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule } from 'nest-winston';

const whitelistEnviroment = ["production"]

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    cors: true
  });

  const logger = await initializeLoggerService(app);

  app.useLogger(logger);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: 'excludeAll',
      excludeExtraneousValues: true
    })
  );

  const env = app.get(ConfigService);
  const currentEnvironment = env.get<string>("APP_ENVIRONMENT");

  // if (!whitelistEnviroment.includes(currentEnvironment)) {
  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Omega API')
    .setDescription('')
    .setVersion('1.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument);
  // }

  const port: number = env.get<number>("APP_PORT", 3000);

  // app.enableCors();
  await app.listen(port);
  if (!whitelistEnviroment.includes(currentEnvironment)) {
    logger.log(`App running in port: ${port}`);
  }
}

const initializeLoggerService = async (app: INestApplication): Promise<LoggerService> => {
  const winstonLoggerInstance = app.get(WINSTON_MODULE_NEST_PROVIDER)

  return winstonLoggerInstance;
}

bootstrap();
>>>>>>> main
