import { Injectable, Logger, Provider } from "@nestjs/common";
import { AuthAddLogoCommand } from "@omega/auth/application/command/auth/auth-add-logo.command";
import { AuthAddResourcesCommand } from "@omega/auth/application/command/auth/auth-add-resources.command";
import { AuthCreateCommand } from "@omega/auth/application/command/auth/auth-create.command";
import { AuthFindManyResourcesQuery } from "@omega/auth/application/query/auth/auth-find-many-resources.query";
import { AuthJwtPayload } from "@omega/auth/application/type/auth.type";
import { InjectCommand as InjectAuthCommand } from "@omega/auth/nest/inject/command.inject";
import { InjectQuery as InjectAuthQuery } from "@omega/auth/nest/inject/query.inject";
import { UserFindOneByAuthQuery } from "@omega/profile/application/query/user/user-find-one-by-auth.query";
import { InjectQuery as InjectProfileQuery } from "@omega/profile/nest/inject/query.inject";
import { InternalError } from "@shared/shared/domain/error";
import { AuthProviderToken, InjectJwt } from "@shared/shared/nest/inject";
import { AuthPayload, AuthProvider, CreateAuthPayload, AuthResourcePayload, AuthResource } from "@shared/shared/providers/auth.provider";
import { JwtProvider } from "@shared/shared/providers/jwt.provider";

@Injectable()
export class AuthProxyService implements AuthProvider {

    constructor(
        @InjectAuthCommand('AuthCreate') private readonly createCommand: AuthCreateCommand,
        @InjectAuthCommand('AuthAddLogo') private readonly addLogoCommand: AuthAddLogoCommand,
        @InjectAuthCommand('AuthAddResources') private readonly addResourcesCommand: AuthAddResourcesCommand,
        @InjectAuthQuery('AuthFindManyResources') private readonly authResourcesFindMany: AuthFindManyResourcesQuery,
        @InjectProfileQuery('UserFindOneByAuth') private readonly findOneUser: UserFindOneByAuthQuery,
        @InjectJwt('Access') private readonly jwt: JwtProvider
    ) { }

    async addLogo(authId: string, logoId: string): Promise<void> {
        await this.addLogoCommand.handleAsync({ authId, logoId });
    }

    async retriveResources(authId: string): Promise<AuthResource[]> {
        const values = await this.authResourcesFindMany.handleAsync({ authId });
        return values.map(x => ({
            resourceId: x.resourceId,
            resourceLabel: x.resourceLabel,
            resourceIcon: x.resourceIcon
        }));
    }

    async addResources(value: AuthResourcePayload): Promise<void> {
        await this.addResourcesCommand.handleAsync({ authId: value.authId, resourceIds: value.resources });
    }

    async createAuth(value: CreateAuthPayload): Promise<string> {
        return this.createCommand.handleAsync(value);
    }

    async validateJwt(jwt: string): Promise<AuthPayload> {
        try {
            const value: AuthJwtPayload = this.jwt.validateJwt<AuthJwtPayload>(jwt);
            const user = await this.findOneUser.handleAsync({ authId: value.sub });
            return {
                dni: user.userDni,
                email: value.email,
                id: user.userId,
                lastname: user.userLastname,
                name: user.userName
            }
        } catch (error) {
            Logger.error(error);
            throw new InternalError('Error during jwt validation.');
        }
    }
}

export const AuthProxyProvider: Provider = {
    provide: AuthProviderToken,
    useClass: AuthProxyService
}