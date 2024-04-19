import { JwtAuthStrategy } from '@/shared/guards/authentication-guard/strategies';
import { Module } from '@nestjs/common';

@Module({
    providers: [
        JwtAuthStrategy
    ],
    exports: [
        JwtAuthStrategy
    ]
})
export class AuthenticationGuardModule { }
