import { CommandHandlerAsync } from "@shared/shared/application";
import { AuthRepository } from "../../repository/auth/aggregate.repositories";
import { AuthNotFoundError } from "@omega/auth/core/domain/auth/errors/auth.errors";

export type AuthRemoveResourceCommandPayload = {
    authId: string;
    accessId: string;
};
export class AuthRemoveResourceCommand implements CommandHandlerAsync<AuthRemoveResourceCommandPayload, void> {
    constructor(
        private readonly repository: AuthRepository
    ) { }

    async handleAsync(value: AuthRemoveResourceCommandPayload): Promise<void> {
        const auth = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.authId }] });
        if (!auth) throw new AuthNotFoundError(value.authId);

        auth.removeResource(value.accessId);
        await this.repository.saveAsync(auth);
    }
}