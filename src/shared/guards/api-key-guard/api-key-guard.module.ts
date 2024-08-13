import { ApiKeyModule } from '@/authentication/api-key/api-key.module';
import { Module } from '@nestjs/common';
import { ApiKeyAuthStrategy } from './strategies/api-key-auth.strategy';

@Module({
    imports: [
        ApiKeyModule
    ],
    providers: [
        ApiKeyAuthStrategy
    ],
    exports: [
        ApiKeyAuthStrategy
    ]
})
export class ApiKeyGuardModule { }
