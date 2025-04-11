import { Global, Module } from "@nestjs/common";
import { AuthModule } from "@omega/auth/auth.module";
import { ApiKeyProviderToken } from "@shared/shared/nest/inject";
import { ApiKeyProxyProvider } from "./api-key-proxy.service";

@Global()
@Module({
    imports: [
        AuthModule
    ],
    providers: [
        ApiKeyProxyProvider
    ],
    exports: [
        ApiKeyProviderToken
    ]
})
export class ApiKeyProxyModule { }