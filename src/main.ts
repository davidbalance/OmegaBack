import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, INestApplication, LoggerService, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as express from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ServerConfig, ServerConfigName } from './shared/config/server.config';

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
  const server = env.get<ServerConfig>(ServerConfigName);

  if (!whitelistEnviroment.includes(server.environment)) {
    const swaggerConfig = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Omega API')
      .setDescription('')
      .setVersion('1.0')
      .build();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, swaggerDocument, { swaggerOptions: { tagsSorter: 'alpha' } });
  }

  app.use(express.json({ limit: '1mb' }));

  // app.enableCors();
  await app.listen(server.port);
  if (!whitelistEnviroment.includes(server.environment)) {
    logger.log(`App running in port: ${server.port}`);
  }
}

const initializeLoggerService = async (app: INestApplication): Promise<LoggerService> => {
  const winstonLoggerInstance = app.get(WINSTON_MODULE_NEST_PROVIDER)
  return winstonLoggerInstance;
}

bootstrap();
