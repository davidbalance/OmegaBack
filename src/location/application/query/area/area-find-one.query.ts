import { AreaNotFoundError } from "@omega/location/core/domain/area/errors/area.errors";
import { AreaModel } from "@omega/location/core/models/area/area.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { AreaRepository } from "../../repository/model.repositories";

export type AreaFindOneQueryPayload = {
    areaId: string;
}
export interface AreaFindOneQuery extends QueryHandlerAsync<AreaFindOneQueryPayload, AreaModel> { }

export class AreaFindOneQueryImpl implements AreaFindOneQuery {
    constructor(
        private readonly repository: AreaRepository
    ) { }

    async handleAsync(query: AreaFindOneQueryPayload): Promise<AreaModel> {
        const value = await this.repository.findOneAsync([{ field: 'areaId', operator: 'eq', value: query.areaId }]);
        if (!value) throw new AreaNotFoundError(query.areaId);
        return value;
    }
}