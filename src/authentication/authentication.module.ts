import { Module } from '@nestjs/common';
import { UserCredentialModule } from './user-credential/user-credential.module';
import { TokenModule } from './token/token.module';
import { AuthenticationController } from './authentication.controller';
import { ApiKeyModule } from './api-key/api-key.module';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard/authentication-guard.module';
import { LocalAuthStrategy } from './strategies';

@Module({
  imports: [
    UserCredentialModule,
    TokenModule,
    ApiKeyModule,
    AuthenticationGuardModule
  ],
  providers: [
    LocalAuthStrategy
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule { }
