import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SqlDatabaseModule } from './shared';
import { WebTokenModule } from './shared/web-token/web-token.module';
import { MedicalOrderModule } from './medical-order/medical-order.module';

@Module({
  imports: [
    SqlDatabaseModule,
    WebTokenModule,
    MedicalOrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
