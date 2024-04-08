import { ApiKeyModule } from '@/authentication/api-key/api-key.module';
import { JwtRefreshStrategy, JwtAuthStrategy, ApiKeyAuthStrategy } from '@/shared/guards/authentication-guard/strategies';
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
        JwtRefreshStrategy,
        JwtAuthStrategy
    ],
    exports: [
        ApiKeyAuthStrategy,
        JwtRefreshStrategy,
        JwtAuthStrategy
    ]
})
export class AuthenticationGuardModule { }
