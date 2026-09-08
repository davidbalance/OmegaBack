import { CreateCompanyFilterPayload } from "@omega/profile/core/domain/user/payloads/company-filter.payload";
import { CommandHandlerAsync } from "@shared/shared/application";
import { UserRepository } from "../../repository/aggregate.repositories";
import { UserNotFoundError } from "@omega/profile/core/domain/user/errors/user.errors";

export type AddCompanyFilterCommandPayload = CreateCompanyFilterPayload
export interface AddCompanyFilterCommand extends CommandHandlerAsync<AddCompanyFilterCommandPayload, void> { }

export class AddCompanyFilterCommandImpl implements AddCompanyFilterCommand {
    constructor(
        private readonly repository: UserRepository
    ) { }

    async handleAsync(value: AddCompanyFilterCommandPayload): Promise<void> {
        const user = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.userId }] });
        if (!user) throw new UserNotFoundError(value.userId);

        user.addCompanyFilter(value);
        await this.repository.saveAsync(user);
    }
}