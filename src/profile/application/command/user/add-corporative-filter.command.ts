import { CommandHandlerAsync } from "@shared/shared/application";
import { UserRepository } from "../../repository/aggregate.repositories";
import { UserNotFoundError } from "@omega/profile/core/domain/user/errors/user.errors";
import { CreateCorporativeFilterPayload } from "@omega/profile/core/domain/user/payloads/corporative-filter.payload";

export type AddCorporativeFilterCommandPayload = CreateCorporativeFilterPayload
export interface AddCorporativeFilterCommand extends CommandHandlerAsync<AddCorporativeFilterCommandPayload, void> { }

export class AddCorporativeFilterCommandImpl implements AddCorporativeFilterCommand {
    constructor(
        private readonly repository: UserRepository
    ) { }

    async handleAsync(value: AddCorporativeFilterCommandPayload): Promise<void> {
        const user = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.userId }] });
        if (!user) throw new UserNotFoundError(value.userId);

        user.addCorporativeFilter(value);
        await this.repository.saveAsync(user);
    }
}