import { Module } from "@nestjs/common";
import { AuthAccessTokenCommandProvider } from "./nest/command/auth/auth-access-token.nest-command";
import { AuthAddApiKeyCommandProvider } from "./nest/command/auth/auth-add-apikey.nest-command";
import { AuthAddLogoCommandProvider } from "./nest/command/auth/auth-add-logo.nest-command";
import { AuthAddResourcesCommandProvider } from "./nest/command/auth/auth-add-resources.nest-command";
import { AuthAddTokenCommandProvider } from "./nest/command/auth/auth-add-token.nest-command";
import { AuthCreateCommandProvider } from "./nest/command/auth/auth-create.nest-command";
import { AuthEditPasswordCommandProvider } from "./nest/command/auth/auth-edit-password.nest-command";
import { AuthRefreshTokenCommandProvider } from "./nest/command/auth/auth-refresh-token.nest-command";
import { AuthRemoveApiKeyCommandProvider } from "./nest/command/auth/auth-remove-apikey.nest-command";
import { AuthRemoveResourceCommandProvider } from "./nest/command/auth/auth-remove-resource.nest-command";
import { AuthRemoveTokenCommandProvider } from "./nest/command/auth/auth-remove-token.nest-command";
import { AuthValidateApiKeyCommandProvider } from "./nest/command/auth/auth-validate-apikey.nest-command";
import { AuthValidateCommandProvider } from "./nest/command/auth/auth-validate.nest-command";
import { LogoCreateCommandProvider } from "./nest/command/logo/logo-create.nest-command";
import { ResourceCreateCommandProvider } from "./nest/command/resource/resource-create.nest-command";
import { ResourceEditCommandProvider } from "./nest/command/resource/resource-edit.nest-command";
import { ResourceRemoveCommandProvider } from "./nest/command/resource/resource-remove.nest-command";
import { AuthGenerateTokenQueryProvider } from "./nest/query/auth/auth-generate-token.nest-query";
import { LogoFindManyQueryProvider } from "./nest/query/logo/logo-find-many.nest-query";
import { ResourceFindManyQueryProvider } from "./nest/query/resource/resource-find-many.nest-query";
import { ResourceFindOneQueryProvider } from "./nest/query/resource/resource-find-one.nest-query";
import { LocalJwtModule } from "@local-jwt/local-jwt";
import { LocalHashModule } from "@local-hash/local-hash";
import { AuthAddLogoCommandToken, AuthAddResourcesCommandToken, AuthCreateCommandToken } from "./nest/inject/command.inject";
import { LocalStrategy } from "./nest/strategy/local.strategy";
import { AuthIntrospectQueryProvider } from "./nest/query/auth/auth-introspect.nest-query";
import { AuthController } from "./controller/auth.controlller";
import { AuthReadController } from "./controller/read/auth_read.controller";
import { LogoReadController } from "./controller/read/logo_read.controller";
import { ResourceReadController } from "./controller/read/resource_read.controller";
import { AuthWriteController } from "./controller/write/auth_write.controlller";
import { ResourceWriteController } from "./controller/write/resource_write.controlller";
import { AuthFindManyResourcesQueryProvider } from "./nest/query/auth/auth_find_many_resources.nest_query";
import { AuthFindManyResourcesQueryToken } from "./nest/inject/query.inject";
import { ApiKeyReadController } from "./controller/read/api_key_read.controller";
import { ApiKeyFindManyQueryProvider } from "./nest/query/auth/api_key_find_many.nest_query";

@Module({
    imports: [
        LocalHashModule,
        LocalJwtModule
    ],
    controllers: [
        ApiKeyReadController,
        AuthController,
        AuthReadController,
        LogoReadController,
        ResourceReadController,
        AuthWriteController,
        ResourceWriteController
    ],
    providers: [
        LocalStrategy,
        ApiKeyFindManyQueryProvider,
        AuthAccessTokenCommandProvider,
        AuthAddApiKeyCommandProvider,
        AuthAddLogoCommandProvider,
        AuthAddResourcesCommandProvider,
        AuthAddTokenCommandProvider,
        AuthCreateCommandProvider,
        AuthEditPasswordCommandProvider,
        AuthIntrospectQueryProvider,
        AuthRefreshTokenCommandProvider,
        AuthRemoveApiKeyCommandProvider,
        AuthRemoveResourceCommandProvider,
        AuthRemoveTokenCommandProvider,
        AuthValidateApiKeyCommandProvider,
        AuthValidateCommandProvider,
        LogoCreateCommandProvider,
        ResourceCreateCommandProvider,
        ResourceEditCommandProvider,
        ResourceRemoveCommandProvider,
        AuthFindManyResourcesQueryProvider,
        AuthGenerateTokenQueryProvider,
        LogoFindManyQueryProvider,
        ResourceFindManyQueryProvider,
        ResourceFindOneQueryProvider
    ],
    exports: [
        AuthFindManyResourcesQueryToken,
        AuthAddLogoCommandToken,
        AuthCreateCommandToken,
        AuthAddResourcesCommandToken
    ]
})
export class AuthModule { }