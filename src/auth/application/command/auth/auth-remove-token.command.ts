import { CommandHandlerAsync } from "@shared/shared/application";
import { AuthNotFoundError } from "@omega/auth/core/domain/auth/errors/auth.errors";
import { AuthRepository } from "../../repository/auth/aggregate.repositories";
import { JwtProvider } from "@shared/shared/providers/jwt.provider";
import { AuthJwtPayload } from "../../type/auth.type";

export type AuthRemoveTokenCommandPayload = {
    token: string;
};
export interface AuthRemoveTokenCommand extends CommandHandlerAsync<AuthRemoveTokenCommandPayload, void> { }

export class AuthRemoveTokenCommandImpl implements AuthRemoveTokenCommand {
    constructor(
        private readonly repository: AuthRepository,
        private readonly jwt: JwtProvider,
    ) { }

    async handleAsync(value: AuthRemoveTokenCommandPayload): Promise<void> {
        const payload = this.jwt.validateJwt<AuthJwtPayload>(value.token);
        const auth = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: payload.sub }] });
        if (!auth) throw new AuthNotFoundError(payload.sub);

        auth.removeToken(value.token);

        await this.repository.saveAsync(auth);
    }
}