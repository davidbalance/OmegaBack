import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
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

  if (!whitelistEnviroment.includes(currentEnvironment)) {
    const swaggerConfig = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Omega API')
      .setDescription('')
      .setVersion('1.0')
      .build();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, swaggerDocument);
  }

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
