import { AuthenticationGuardModule, JwtAuthStrategy } from '@/shared/guards/authentication-guard';
import { SqlDatabaseModule } from '@/shared/sql-database';
import { Module } from '@nestjs/common';
import { WebLogoModule } from '../web-logo/web-logo.module';
import { WebResourceModule } from '../web-resource/web-resource.module';
import { WebClientController } from './controllers/web-client.controller';
import { WebClient } from './entities/web-client.entity';
import { WebClientRepository } from './repositories/web-client.repository';
import { WebClientService } from './services/web-client.service';
import { WebClientLogoController } from './controllers/web-client-logo.controller';
import { WebClientResourceController } from './controllers/web-client-resource.controller';
import { WebClientResourceService } from './services/web-client-resource.service';
import { WebClientLogoService } from './services/web-client-logo.service';
import { CredentialWebClientListener } from './listeners/credential-web-client.listener';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([WebClient]),
    AuthenticationGuardModule,
    WebResourceModule,
    WebLogoModule
  ],
  controllers: [
    WebClientLogoController,
    WebClientResourceController,
    WebClientController
  ],
  providers: [
    WebClientRepository,
    WebClientLogoService,
    WebClientResourceService,
    WebClientService,
    CredentialWebClientListener,
    JwtAuthStrategy,
  ],
  exports: [
    WebClientService
  ]
})
export class WebClientModule { }
