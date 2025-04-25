import { AuthNotFoundError } from "@omega/auth/core/domain/auth/errors/auth.errors";
import { CommandHandlerAsync } from "@shared/shared/application";
import { AuthRepository } from "../../repository/auth/aggregate.repositories";

export type AuthAddLogoCommandPayload = {
    authId: string;
    logoId: string;
};
export interface AuthAddLogoCommand extends CommandHandlerAsync<AuthAddLogoCommandPayload, void> { }

export class AuthAddLogoCommandImpl implements AuthAddLogoCommand {
    constructor(
        private readonly repository: AuthRepository,
    ) { }

    async handleAsync(value: AuthAddLogoCommandPayload): Promise<void> {
        const auth = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.authId }] });
        if (!auth) throw new AuthNotFoundError(value.authId);

        auth.addLogo(value.logoId);

        await this.repository.saveAsync(auth);
    }
}