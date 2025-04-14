import { CorporativeNotFoundError } from "@omega/location/core/domain/corporative/errors/corporative.errors";
import { CorporativeRepository } from "../../repository/aggregate.repositories";
import { CommandHandlerAsync } from "@shared/shared/application";
import { AddBranchToCorporativePayload } from "@omega/location/core/domain/corporative/payloads/corporative.payloads";
import { Corporative } from "@omega/location/core/domain/corporative/corporative.domain";

export type BaseBranchCreateCommandPayload = {
    corporativeId: string
} & AddBranchToCorporativePayload;
export abstract class BaseBranchCreateCommand<T extends BaseBranchCreateCommandPayload> implements CommandHandlerAsync<T, void> {

    constructor(
        protected readonly repository: CorporativeRepository
    ) { }

    protected async getAggregate(value: T): Promise<Corporative> {
        const corporative = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.corporativeId }] });
        if (!corporative) throw new CorporativeNotFoundError(value.corporativeId);
        return corporative;
    }

    abstract handleAsync(value: T): Promise<void>;
}