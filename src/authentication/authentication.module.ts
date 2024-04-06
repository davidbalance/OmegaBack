import { Module } from '@nestjs/common';
import { UserCredentialModule } from './user-credential/user-credential.module';
import { TokenModule } from './token/token.module';
import { AuthenticationController } from './authentication.controller';
import {
  JwtAuthStrategy,
  JwtRefreshStrategy,
  LocalAuthStrategy
} from './strategies';
import { ApiKeyModule } from './api-key/api-key.module';

@Module({
  imports: [
    UserCredentialModule,
    TokenModule,
    ApiKeyModule
  ],
  providers: [
    LocalAuthStrategy,
    JwtRefreshStrategy,
    JwtAuthStrategy
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule { }
