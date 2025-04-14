import { CorporativeNotFoundError } from "@omega/location/core/domain/corporative/errors/corporative.errors";
import { AddCompanyToCorporativePayload } from "@omega/location/core/domain/corporative/payloads/corporative.payloads";
import { CommandHandlerAsync } from "@shared/shared/application";
import { CorporativeRepository } from "../../repository/aggregate.repositories";
import { Corporative } from "@omega/location/core/domain/corporative/corporative.domain";

export type BaseCompanyCreateCommandPayload = {
    corporativeId: string
} & AddCompanyToCorporativePayload;
export abstract class BaseCompanyCreateCommand<T extends BaseCompanyCreateCommandPayload> implements CommandHandlerAsync<T, void> {
    constructor(
        protected readonly aggregateRepository: CorporativeRepository
    ) { }

    protected async getAggregate(value: T): Promise<Corporative> {
        const corporative = await this.aggregateRepository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.corporativeId }] });
        if (!corporative) throw new CorporativeNotFoundError(value.corporativeId);
        return corporative;
    }

    abstract handleAsync(value: T): Promise<void>;
}