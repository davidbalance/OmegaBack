import { CorporativeNotFoundError } from "@omega/location/core/domain/corporative/errors/corporative.errors";
import { RemoveBranchFromCorporativePayload } from "@omega/location/core/domain/corporative/payloads/corporative.payloads";
import { CommandHandlerAsync } from "@shared/shared/application";
import { CorporativeRepository } from "../../repository/aggregate.repositories";

export type BranchRemoveCommandPayload = {
    corporativeId: string;
} & RemoveBranchFromCorporativePayload;
export interface BranchRemoveCommand extends CommandHandlerAsync<BranchRemoveCommandPayload, void> { }

export class BranchRemoveCommandImpl implements BranchRemoveCommand {
    constructor(
        private readonly repository: CorporativeRepository
    ) { }

    async handleAsync(value: BranchRemoveCommandPayload): Promise<void> {
        const corporative = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.corporativeId }] });
        if (!corporative) throw new CorporativeNotFoundError(value.corporativeId);

        corporative.removeBranchFromCompany(value);
        await this.repository.saveAsync(corporative);
    }
}