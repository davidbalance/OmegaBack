import { Module } from '@nestjs/common';
import { UserCredentialModule } from './user-credential/user-credential.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [UserCredentialModule, TokenModule]
})
export class AuthenticationModule {}
