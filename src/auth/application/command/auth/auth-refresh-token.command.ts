import { CommandHandlerAsync } from "@shared/shared/application";
import { JwtProvider } from "@shared/shared/providers/jwt.provider";
import { AuthJwtPayload, RefreshJwtPayload } from "../../type/auth.type";
import { AuthRepository } from "../../repository/auth/aggregate.repositories";
import { TokenUnauthorizeError } from "@omega/auth/core/domain/auth/errors/token.errors";
import { AuthGenerateTokenQuery } from "../../query/auth/auth-generate-token.query";

export type AuthRefreshTokenCommandPayload = {
    jwt: string;
};
export interface AuthRefreshTokenCommand extends CommandHandlerAsync<AuthRefreshTokenCommandPayload, { accessToken: string, refreshToken: string }> { }

export class AuthRefreshTokenCommandImpl implements AuthRefreshTokenCommand {
    constructor(
        private readonly repository: AuthRepository,
        private readonly generator: AuthGenerateTokenQuery,
        private readonly accessJwt: JwtProvider,
        private readonly refreshJwt: JwtProvider
    ) { }

    async handleAsync(value: AuthRefreshTokenCommandPayload): Promise<{ accessToken: string, refreshToken: string }> {

        const refreshPayload = this.refreshJwt.validateJwt<RefreshJwtPayload>(value.jwt);
        const accessPayload = this.accessJwt.validateJwt<AuthJwtPayload>(refreshPayload.token);

        if (accessPayload.sub !== refreshPayload.sub) throw new TokenUnauthorizeError();

        const auth = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: accessPayload.sub }] });
        if (!auth) throw new TokenUnauthorizeError();

        const newAccess = await this.generator.handleAsync({ authId: accessPayload.sub });
        const newRefresh = this.refreshJwt.createJwt<RefreshJwtPayload>({ sub: accessPayload.sub, token: newAccess });
        auth.refreshToken(newAccess);

        await this.repository.saveAsync(auth);
        return {
            accessToken: newAccess,
            refreshToken: newRefresh,
        }
    }
}