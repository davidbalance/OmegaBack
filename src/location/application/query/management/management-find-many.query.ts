
import { ManagementModel } from "@omega/location/core/models/management/management.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { Filter, Order, Pagination } from "@shared/shared/domain";
import { ManagementRepository } from "../../repository/model.repositories";
import { PaginationResponse } from "@shared/shared/nest/pagination-response";

export type ManagementFindManyQueryPayload = {
    filter?: string;
} & Required<Pagination> & Order<ManagementModel>
export class ManagementFindManyQuery implements QueryHandlerAsync<ManagementFindManyQueryPayload, PaginationResponse<ManagementModel>> {
    constructor(
        private readonly repository: ManagementRepository
    ) { }

    async handleAsync(query: ManagementFindManyQueryPayload): Promise<PaginationResponse<ManagementModel>> {

        const filter: Filter<ManagementModel>[] = [];
        if (query.filter) {
            filter.push({ field: 'managementName', operator: 'like', value: query.filter });
        }
        const data = await this.repository.findManyAsync({ ...query, filter });
        const amount = await this.repository.countAsync(filter);
        return { data, amount };
    }
}