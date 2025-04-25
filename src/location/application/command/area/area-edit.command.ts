import { AreaConflictError, AreaNotFoundError } from "@omega/location/core/domain/area/errors/area.errors";
import { CommandHandlerAsync } from "@shared/shared/application";
import { AreaRepository } from "../../repository/aggregate.repositories";

export type AreaEditCommandPayload = {
    areaId: string;
    areaName: string;
};
export interface AreaEditCommand extends CommandHandlerAsync<AreaEditCommandPayload, void> { }

export class AreaEditCommandImpl implements AreaEditCommand {
    constructor(
        private readonly repository: AreaRepository
    ) { }
    async handleAsync(value: AreaEditCommandPayload): Promise<void> {
        const area = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.areaId }] });
        if (!area) throw new AreaNotFoundError(value.areaId);

        const exists = await this.repository.findOneAsync({ filter: [{ field: 'name', operator: 'eq', value: value.areaName }] });
        if (exists) throw new AreaConflictError(value.areaName);

        area.rename(value.areaName);
        await this.repository.saveAsync(area);
    }
}