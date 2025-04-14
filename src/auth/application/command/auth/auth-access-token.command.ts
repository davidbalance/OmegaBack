import { CommandHandlerAsync } from "@shared/shared/application";
import { RefreshJwtPayload } from "../../type/auth.type";
import { AuthRepository } from "../../repository/auth/aggregate.repositories";
import { AuthNotFoundError } from "@omega/auth/core/domain/auth/errors/auth.errors";
import { JwtProvider } from "@shared/shared/providers/jwt.provider";
import { AuthGenerateTokenQuery } from "../../query/auth/auth-generate-token.query";

export type AuthAccessTokenCommandPayload = {
    authId: string;
};
export class AuthAccessTokenCommand implements CommandHandlerAsync<AuthAccessTokenCommandPayload, { accessToken: string, refreshToken: string }> {
    constructor(
        private readonly repository: AuthRepository,
        private readonly generator: AuthGenerateTokenQuery,
        private readonly jwt: JwtProvider,
    ) { }

    async handleAsync(value: AuthAccessTokenCommandPayload): Promise<{ accessToken: string, refreshToken: string }> {
        const auth = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.authId }] });
        if (!auth) throw new AuthNotFoundError(value.authId);
        
        const newAccess = await this.generator.handleAsync({ authId: value.authId });
        const newRefresh = this.jwt.createJwt<RefreshJwtPayload>({ sub: value.authId, token: newAccess });
        
        auth.addToken(newAccess);
        
        await this.repository.saveAsync(auth);
        return {
            accessToken: newAccess,
            refreshToken: newRefresh,
        }
    }
}