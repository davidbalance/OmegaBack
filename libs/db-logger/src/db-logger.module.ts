import { Module } from '@nestjs/common';
import { WriteLoggerCommandProvider } from './nest/command/write-logger.nest-command';
import { ReadLoggerQueryProvider } from './nest/query/query-logger.nest-command';
import { LoggerController } from './controller/logger.controller';
import { WriteLoggerCommandToken } from './nest/inject/command.inject';
import { ReadLoggerLevelQueryProvider } from './nest/query/logger-levels-query.nest-command';

@Module({
  controllers: [
    LoggerController
  ],
  providers: [
    WriteLoggerCommandProvider,
    ReadLoggerQueryProvider,
    ReadLoggerLevelQueryProvider
  ],
  exports: [WriteLoggerCommandToken]
})
export class DbLoggerModule { }
