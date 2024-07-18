import { Module } from '@nestjs/common';
import { WebClientService } from './web-client.service';
import { WebClientController } from './web-client.controller';
import { SqlDatabaseModule } from '@/shared/sql-database';
import { WebClient } from './entities/web-client.entity';
import { WebClientRepository } from './web-client.repository';
import { JwtAuthStrategy } from '@/shared/guards/authentication-guard/strategies';
import { CredentialListener } from './listeners';
import { AccessControlListener } from './listeners/access-control.listener';
import { WebResourceModule } from '../web-resource/web-resource.module';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { WebLogoModule } from '../web-logo/web-logo.module';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([WebClient]),
    WebResourceModule,
    AuthenticationGuardModule,
    WebLogoModule
  ],
  controllers: [WebClientController],
  providers: [
    WebClientService,
    CredentialListener,
    AccessControlListener,
    JwtAuthStrategy,
    WebClientRepository,
  ],
  exports: [WebClientService]
})
export class WebClientModule { }
