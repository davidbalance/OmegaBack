import { QueryHandlerAsync } from "@shared/shared/application";
import { AuthNotFoundError } from "@omega/auth/core/domain/auth/errors/auth.errors";
import { JwtProvider } from "@shared/shared/providers/jwt.provider";
import { AuthRepository, AuthResourceRepository } from "../../repository/auth/model.repositories";
import { AuthJwtPayload } from "../../type/auth.type";

export type AuthGenerateTokenQueryPayload = {
    authId: string;
};
export interface AuthGenerateTokenQuery extends QueryHandlerAsync<AuthGenerateTokenQueryPayload, string> { }

export class AuthGenerateTokenQueryImpl implements AuthGenerateTokenQuery {
    constructor(
        private readonly auth: AuthRepository,
        private readonly resource: AuthResourceRepository,
        private readonly jwt: JwtProvider,
    ) { }

    async handleAsync(value: AuthGenerateTokenQueryPayload): Promise<string> {
        const auth = await this.auth.findOneAsync([{ field: 'authId', operator: 'eq', value: value.authId }]);
        if (!auth) throw new AuthNotFoundError(value.authId);

        const resources = await this.resource.findManyAsync({ filter: [{ field: 'authId', operator: 'eq', value: value.authId }] });

        const payload: AuthJwtPayload = {
            email: auth.authEmail,
            lastname: auth.authLastname,
            name: auth.authName,
            logo: auth.logo,
            resources: resources.map(e => ({
                address: e.resourceAddress,
                icon: e.resourceIcon,
                label: e.resourceLabel
            })),
            sub: auth.authId
        }

        const signedPayload = this.jwt.createJwt<AuthJwtPayload>(payload);
        return signedPayload;
    }
}