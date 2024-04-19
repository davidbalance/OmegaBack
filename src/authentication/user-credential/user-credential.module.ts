import { Module } from '@nestjs/common';
import { UserCredentialService } from './user-credential.service';
import { UserCredentialController } from './user-credential.controller';
import { SqlDatabaseModule } from 'src/shared';
import { UserCredential } from './entities/user-credential.entity';
import { UserCredentialRepository } from './user-credential.repository';
import { UserListener } from './listeners';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { LocalAuthorizationModule } from '@/shared/shared-authorization/local-authorization/local-authorization.module';
import { AuthorizationGuard } from '@/shared/guards/authorization-guard/authorization.guard';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([UserCredential]),
    AuthenticationGuardModule,
    LocalAuthorizationModule
  ],
  controllers: [
    UserCredentialController
  ],
  providers: [
    UserCredentialService,
    UserCredentialRepository,
    UserListener,
    AuthorizationGuard
  ],
  exports: [UserCredentialService]
})
export class UserCredentialModule { }
