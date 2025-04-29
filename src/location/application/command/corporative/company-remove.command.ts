import { CorporativeNotFoundError } from "@omega/location/core/domain/corporative/errors/corporative.errors";
import { CommandHandlerAsync } from "@shared/shared/application";
import { CorporativeRepository } from "../../repository/aggregate.repositories";

export type CompanyRemoveCommandPayload = {
    corporativeId: string;
    companyId: string;
};
export interface CompanyRemoveCommand extends CommandHandlerAsync<CompanyRemoveCommandPayload, void> { }

export class CompanyRemoveCommandImpl implements CompanyRemoveCommand {
    constructor(
        private readonly repository: CorporativeRepository
    ) { }

    async handleAsync(value: CompanyRemoveCommandPayload): Promise<void> {
        const corporative = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.corporativeId }] });
        if (!corporative) throw new CorporativeNotFoundError(value.corporativeId);

        corporative.removeCompany(value.companyId);
        await this.repository.saveAsync(corporative);
    }
}