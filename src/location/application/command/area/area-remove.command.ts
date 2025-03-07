import { AreaNotFoundError } from "@omega/location/core/domain/area/errors/area.errors";
import { CommandHandlerAsync } from "@shared/shared/application";
import { AreaRepository } from "../../repository/aggregate.repositories";

export type AreaRemoveCommandPayload = {
    areaId: string;
};
export class AreaRemoveCommand implements CommandHandlerAsync<AreaRemoveCommandPayload, void> {
    constructor(
        private readonly repository: AreaRepository
    ) { }
    async handleAsync(value: AreaRemoveCommandPayload): Promise<void> {
        const area = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.areaId }] });
        if (!area) throw new AreaNotFoundError(value.areaId);

        area.remove();
        await this.repository.saveAsync(area);
    }
}