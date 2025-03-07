import { CorporativeNotFoundError } from "@omega/location/core/domain/corporative/errors/corporative.errors";
import { AddBranchToCorporativePayload } from "@omega/location/core/domain/corporative/payloads/corporative.payloads";
import { CommandHandlerAsync } from "@shared/shared/application";
import { CorporativeRepository } from "../../repository/aggregate.repositories";

export type BranchCreateCommandPayload = {
    corporativeId: string
} & AddBranchToCorporativePayload;
export class BranchCreateCommand implements CommandHandlerAsync<BranchCreateCommandPayload, void> {
    constructor(
        private readonly repository: CorporativeRepository
    ) { }

    async handleAsync(value: BranchCreateCommandPayload): Promise<void> {
        const corporative = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.corporativeId }] });
        if (!corporative) throw new CorporativeNotFoundError(value.corporativeId);

        corporative.addBranchToCompany(value);
        await this.repository.saveAsync(corporative);
    }
}