import { ApiKeyModule } from '@/authentication/api-key/api-key.module';
import { JwtAuthStrategy, ApiKeyAuthStrategy } from '@/shared/guards/authentication-guard/strategies';
import { TokenModule } from '@/authentication/token/token.module';
import { UserCredentialModule } from '@/authentication/user-credential/user-credential.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        UserCredentialModule,
        TokenModule,
        ApiKeyModule
    ],
    providers: [
        ApiKeyAuthStrategy,
        JwtAuthStrategy
    ],
    exports: [
        ApiKeyAuthStrategy,
        JwtAuthStrategy
    ]
})
export class AuthenticationGuardModule { }
