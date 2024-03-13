import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SqlDatabaseModule } from './shared';
import { WebTokenModule } from './shared/web-token/web-token.module';
import { LoggerModule } from './shared/logger/logger.module';

@Module({
  imports: [SqlDatabaseModule, WebTokenModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
