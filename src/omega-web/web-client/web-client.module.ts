import { Module } from '@nestjs/common';
import { WebClientService } from './web-client.service';
import { WebClientController } from './web-client.controller';
import { SqlDatabaseModule } from '@/shared';
import { WebClient } from './entities/web-client.entity';
import { WebClientRepository } from './web-client.repository';
import { JwtAuthStrategy } from '@/authentication/strategies';
import { UserListener } from './listeners';
import { AccessControlListener } from './listeners/access-control.listener';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([WebClient])
  ],
  controllers: [WebClientController],
  providers: [
    WebClientService,
    WebClientRepository,
    UserListener,
    AccessControlListener,
    JwtAuthStrategy
  ],
  exports: [WebClientService]
})
export class WebClientModule { }
