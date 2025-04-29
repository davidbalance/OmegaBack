import { CorporativeNotFoundError } from "@omega/location/core/domain/corporative/errors/corporative.errors";
import { CommandHandlerAsync } from "@shared/shared/application";
import { CorporativeRepository } from "../../repository/aggregate.repositories";

export type CorporativeRemoveCommandPayload = {
    corporativeId: string;
};
export interface CorporativeRemoveCommand extends CommandHandlerAsync<CorporativeRemoveCommandPayload, void> { }

export class CorporativeRemoveCommandImpl implements CorporativeRemoveCommand {
    constructor(
        private readonly repository: CorporativeRepository
    ) { }

    async handleAsync(value: CorporativeRemoveCommandPayload): Promise<void> {
        const corporative = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.corporativeId }] });
        if (!corporative) throw new CorporativeNotFoundError(value.corporativeId);

        corporative.remove();
        await this.repository.saveAsync(corporative);
    }
}