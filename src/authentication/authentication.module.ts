import { Module } from '@nestjs/common';
import { UserCredentialModule } from './user-credential/user-credential.module';
import { TokenModule } from './token/token.module';
import { AuthenticationController } from './authentication.controller';
import { ApiKeyModule } from './api-key/api-key.module';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard/authentication-guard.module';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { LocalAuthStrategy } from './strategies/local-auth.strategy';

@Module({
  imports: [
    UserCredentialModule,
    TokenModule,
    ApiKeyModule,
    AuthenticationGuardModule
  ],
  providers: [
    LocalAuthStrategy,
    JwtRefreshStrategy
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule { }
