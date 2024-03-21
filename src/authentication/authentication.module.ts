import { Module } from '@nestjs/common';
import { UserCredentialModule } from './user-credential/user-credential.module';
import { TokenModule } from './token/token.module';
import { AuthenticationController } from './authentication.controller';

@Module({
  imports: [UserCredentialModule, TokenModule],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
