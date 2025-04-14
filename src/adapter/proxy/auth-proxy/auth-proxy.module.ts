import { Global, Module } from "@nestjs/common";
import { AuthModule } from "@omega/auth/auth.module";
import { AuthProviderToken } from "@shared/shared/nest/inject";
import { AuthProxyProvider } from "./auth-proxy.service";
import { LocalJwtModule } from "@local-jwt/local-jwt";
import { ProfileModule } from "@omega/profile/profile.module";

@Global()
@Module({
    imports: [
        LocalJwtModule,
        AuthModule,
        ProfileModule
    ],
    providers: [AuthProxyProvider],
    exports: [
        AuthProviderToken
    ]
})
export class AuthProxyModule { }