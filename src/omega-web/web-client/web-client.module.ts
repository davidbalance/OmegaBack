import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { SqlDatabaseModule } from '@/shared/sql-database/sql-database.module';
import { Module } from '@nestjs/common';
import { WebLogoModule } from '../web-logo/web-logo.module';
import { WebResourceModule } from '../web-resource/web-resource.module';
import { WebClientRepository } from './repositories/web-client.repository';
import { WebClientService } from './services/web-client.service';
import { WebClientLogoController } from './controllers/web-client-logo.controller';
import { WebClientResourceController } from './controllers/web-client-resource.controller';
import { WebClientResourceService } from './services/web-client-resource.service';
import { WebClientLogoService } from './services/web-client-logo.service';
import { CredentialWebClientListener } from './listeners/credential-web-client.listener';
import { JwtAuthStrategy } from '@/shared/guards/authentication-guard/strategies/jwt-auth.strategy';
import { WebClientEntity } from './entities/web-client.entity';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([
      WebClientEntity
    ]),
    AuthenticationGuardModule,
    WebResourceModule,
    WebLogoModule
  ],
  controllers: [
    WebClientLogoController,
    WebClientResourceController
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
