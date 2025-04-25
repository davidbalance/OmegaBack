import { CorporativeNotFoundError } from "@omega/location/core/domain/corporative/errors/corporative.errors";
import { MoveBranchPayload } from "@omega/location/core/domain/corporative/payloads/corporative.payloads";
import { CommandHandlerAsync } from "@shared/shared/application";
import { CorporativeRepository } from "../../repository/aggregate.repositories";

export type BranchMoveCommandPayload = {
    fromCorporativeId: string;
    toCorporativeId: string;
} & MoveBranchPayload;
export interface BranchMoveCommand extends CommandHandlerAsync<BranchMoveCommandPayload, void> { }

export class BranchMoveCommandImpl implements BranchMoveCommand {
    constructor(
        private readonly repository: CorporativeRepository
    ) { }

    async handleAsync(value: BranchMoveCommandPayload): Promise<void> {
        const fromCorporative = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.fromCorporativeId }] });
        if (!fromCorporative) throw new CorporativeNotFoundError(value.fromCorporativeId);

        const toCorporative = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.toCorporativeId }] });
        if (!toCorporative) throw new CorporativeNotFoundError(value.toCorporativeId);

        fromCorporative.moveBranchTo(toCorporative, value);
        await this.repository.saveAsync(fromCorporative);
    }
}