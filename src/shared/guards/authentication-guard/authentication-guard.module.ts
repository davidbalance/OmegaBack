import { Module } from '@nestjs/common';
import { JwtAuthStrategy } from './strategies/jwt-auth.strategy';

@Module({
    providers: [
        JwtAuthStrategy
    ],
    exports: [
        JwtAuthStrategy
    ]
})
export class AuthenticationGuardModule { }
