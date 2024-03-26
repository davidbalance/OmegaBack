import { Module } from '@nestjs/common';
import { WebClientService } from './web-client.service';
import { WebClientController } from './web-client.controller';
import { SqlDatabaseModule } from '@/shared';
import { WebClient } from './entities/web-client.entity';
import { WebClientRepository } from './web-clinet.repository';
import { WebRoutesModule } from '../web-routes/web-routes.module';
import { JwtAuthStrategy } from '@/authentication/strategies';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([WebClient]),
    WebRoutesModule
  ],
  controllers: [WebClientController],
  providers: [WebClientService, WebClientRepository, JwtAuthStrategy],
  exports: [WebClientService]
})
export class WebClientModule { }
