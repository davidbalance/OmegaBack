import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SqlDatabaseModule } from './shared';

@Module({
  imports: [SqlDatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
