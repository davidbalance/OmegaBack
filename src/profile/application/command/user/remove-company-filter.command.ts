import { CreateCompanyFilterPayload } from "@omega/profile/core/domain/user/payloads/company-filter.payload";
import { CommandHandlerAsync } from "@shared/shared/application";
import { UserRepository } from "../../repository/aggregate.repositories";
import { UserNotFoundError } from "@omega/profile/core/domain/user/errors/user.errors";

export type RemoveCompanyFilterCommandPayload = {
    userId: string;
    filterId: string;
}
export interface RemoveCompanyFilterCommand extends CommandHandlerAsync<RemoveCompanyFilterCommandPayload, void> { }

export class RemoveCompanyFilterCommandImpl implements RemoveCompanyFilterCommand {
    constructor(
        private readonly repository: UserRepository
    ) { }

    async handleAsync(value: RemoveCompanyFilterCommandPayload): Promise<void> {
        const user = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.userId }] });
        if (!user) throw new UserNotFoundError(value.userId);

        user.removeCompanyFilter(value.filterId);
        await this.repository.saveAsync(user);
    }
}