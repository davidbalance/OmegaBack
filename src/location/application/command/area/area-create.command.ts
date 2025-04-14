import { Area } from "@omega/location/core/domain/area/area.domain";
import { AreaConflictError } from "@omega/location/core/domain/area/errors/area.errors";
import { CreateAreaPayload } from "@omega/location/core/domain/area/payloads/area.payloads";
import { CommandHandlerAsync } from "@shared/shared/application";
import { AreaRepository } from "../../repository/aggregate.repositories";

export type AreaCreateCommandPayload = CreateAreaPayload;
export class AreaCreateCommand implements CommandHandlerAsync<AreaCreateCommandPayload, void> {
    constructor(
        private readonly repository: AreaRepository
    ) { }
    async handleAsync(value: AreaCreateCommandPayload): Promise<void> {
        const exists = await this.repository.findOneAsync({ filter: [{ field: 'name', operator: 'eq', value: value.name }] });
        if (exists) throw new AreaConflictError(value.name);

        const area = Area.create(value);
        await this.repository.saveAsync(area);
    }
}