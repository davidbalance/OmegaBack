import { Corporative } from "@omega/location/core/domain/corporative/corporative.domain";
import { CorporativeConflictError } from "@omega/location/core/domain/corporative/errors/corporative.errors";
import { CreateCorporativePayload } from "@omega/location/core/domain/corporative/payloads/corporative.payloads";
import { CommandHandlerAsync } from "@shared/shared/application";
import { CorporativeRepository } from "../../repository/aggregate.repositories";

export type CorporativeCreateCommandPayload = CreateCorporativePayload;
export class CorporativeCreateCommand implements CommandHandlerAsync<CorporativeCreateCommandPayload, void> {
    constructor(
        private readonly repository: CorporativeRepository
    ) { }

    async handleAsync(value: CorporativeCreateCommandPayload): Promise<void> {
        const exists = await this.repository.findOneAsync({ filter: [{ field: 'name', operator: 'eq', value: value.name }] });
        if (exists) throw new CorporativeConflictError(value.name);

        const corporative = Corporative.create(value);
        await this.repository.saveAsync(corporative);
    }
}