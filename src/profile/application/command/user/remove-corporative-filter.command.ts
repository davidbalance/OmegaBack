import { CommandHandlerAsync } from "@shared/shared/application";
import { UserRepository } from "../../repository/aggregate.repositories";
import { UserNotFoundError } from "@omega/profile/core/domain/user/errors/user.errors";

export type RemoveCorporativeFilterCommandPayload = {
    userId: string;
    filterId: string;
}
export interface RemoveCorporativeFilterCommand extends CommandHandlerAsync<RemoveCorporativeFilterCommandPayload, void> { }

export class RemoveCorporativeFilterCommandImpl implements RemoveCorporativeFilterCommand {
    constructor(
        private readonly repository: UserRepository
    ) { }

    async handleAsync(value: RemoveCorporativeFilterCommandPayload): Promise<void> {
        const user = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.userId }] });
        if (!user) throw new UserNotFoundError(value.userId);

        user.removeCompanyFilter(value.filterId);
        await this.repository.saveAsync(user);
    }
}