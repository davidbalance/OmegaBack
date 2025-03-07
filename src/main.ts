import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupLogger } from './_setup/helper/setup-logger.helper';
import { ConfigService } from '@nestjs/config';
import { ServerConfig, ServerConfigName } from './_setup/config/server.config';
import { setupGlobalPipesAndInterceptors } from './_setup/helper/setup-global-pipes-and-interceptors.helper';
import { setupApiReference } from './_setup/helper/setup-api-reference.helper';
import { DomainErrorFilter } from '@shared/shared/nest/filters';
import { Logger } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupGlobalPipesAndInterceptors(app);
  setupLogger(app);
  setupApiReference(app);

  app.useGlobalFilters(new DomainErrorFilter())

  const configService = app.get(ConfigService);
  const serverConfig = configService.getOrThrow<ServerConfig>(ServerConfigName);

  const logger = app.get<Logger>(WINSTON_MODULE_NEST_PROVIDER);
  await app.listen(serverConfig.port, serverConfig.network);
  logger.debug(`Running in port: http://${serverConfig.network}:${serverConfig.port}`);
  if (serverConfig.nodeEnv === 'development') {
    logger.debug(`API Reference running in http://${serverConfig.network}:${serverConfig.port}/reference`);
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();