import { AreaModel } from "@omega/location/core/models/area/area.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { Filter, Order, Pagination } from "@shared/shared/domain";
import { AreaRepository } from "../../repository/model.repositories";
import { PaginationResponse } from "@shared/shared/nest/pagination-response";

export type AreaFindManyQueryPayload = {
    filter?: string;
} & Required<Pagination> & Order<AreaModel>;
export interface AreaFindManyQuery extends QueryHandlerAsync<AreaFindManyQueryPayload, PaginationResponse<AreaModel>> { }

export class AreaFindManyQueryImpl implements AreaFindManyQuery {
    constructor(
        private readonly repository: AreaRepository
    ) { }

    async handleAsync(query: AreaFindManyQueryPayload): Promise<PaginationResponse<AreaModel>> {
        const filter: Filter<AreaModel>[] = [];
        if (query.filter) {
            filter.push({ field: 'areaName', operator: 'like', value: query.filter });
        }

        const data = await this.repository.findManyAsync({ ...query, filter });
        const amount = await this.repository.countAsync(filter);

        return { data, amount };
    }
}