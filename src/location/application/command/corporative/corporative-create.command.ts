import { CorporativeConflictError } from "@omega/location/core/domain/corporative/errors/corporative.errors";
import { Corporative } from "@omega/location/core/domain/corporative/corporative.domain";
import { CorporativeRepository } from "../../repository/aggregate.repositories";
import { CommandHandlerAsync } from "@shared/shared/application";
import { CreateCorporativePayload } from "@omega/location/core/domain/corporative/payloads/corporative.payloads";

export type CorporativeCreateCommandPayload = CreateCorporativePayload;
export interface CorporativeCreateCommand extends CommandHandlerAsync<CorporativeCreateCommandPayload, void> { }

export class CorporativeCreateCommandImpl implements CorporativeCreateCommand {
    constructor(
        protected readonly aggregateRepository: CorporativeRepository
    ) { }

    async handleAsync(value: CorporativeCreateCommandPayload): Promise<void> {
        const exists = await this.aggregateRepository.findOneAsync({ filter: [{ field: 'name', operator: 'eq', value: value.name }] });
        if (exists) throw new CorporativeConflictError(value.name);

        const corporative = Corporative.create({ ...value });
        await this.aggregateRepository.saveAsync(corporative);
    }
}