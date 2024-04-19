import { Module } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { ApiKeyController } from './api-key.controller';
import { SqlDatabaseModule } from '@/shared';
import { ApiKey } from './entities/api-key.entity';
import { ApiKeyRepository } from './api-key.repository';
import { UserCredentialModule } from '../user-credential/user-credential.module';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { LocalAuthorizationModule } from '@/shared/shared-authorization/local-authorization/local-authorization.module';
import { AuthorizationModule } from '@/authorization/authorization.module';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([ApiKey]),
    UserCredentialModule,
    AuthenticationGuardModule,
    LocalAuthorizationModule
  ],
  controllers: [ApiKeyController],
  providers: [
    ApiKeyService,
    ApiKeyRepository,
    AuthorizationModule
  ],
  exports: [ApiKeyService]
})
export class ApiKeyModule { }
