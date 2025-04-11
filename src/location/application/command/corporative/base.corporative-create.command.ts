import { Corporative } from "@omega/location/core/domain/corporative/corporative.domain";
import { CreateCorporativePayload } from "@omega/location/core/domain/corporative/payloads/corporative.payloads";
import { CommandHandlerAsync } from "@shared/shared/application";
import { CorporativeRepository } from "../../repository/aggregate.repositories";

export type BaseCorporativeCreateCommandPayload = CreateCorporativePayload;
export abstract class BaseCorporativeCreateCommand<T extends BaseCorporativeCreateCommandPayload> implements CommandHandlerAsync<T, void> {
    constructor(
        protected readonly aggregateRepository: CorporativeRepository
    ) { }
    
    protected createCorporative(value: T): Corporative {
        return Corporative.create({ ...value });
    }

    abstract handleAsync(value: T): Promise<void>;
}