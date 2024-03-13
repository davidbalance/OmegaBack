import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SqlDatabaseModule } from './shared/sql-database/sql-database.module';

@Module({
  imports: [SqlDatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
