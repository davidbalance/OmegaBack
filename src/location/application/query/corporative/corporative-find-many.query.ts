import { CorporativeModel } from "@omega/location/core/models/corporative/corporative.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { Pagination, Order, Filter } from "@shared/shared/domain";
import { CorporativeRepository } from "../../repository/model.repositories";
import { PaginationResponse } from "@shared/shared/nest/pagination-response";

export type CorporativeFindManyQueryPayload = {
    filter?: string;
} & Required<Pagination> & Order<CorporativeModel>;
export interface CorporativeFindManyQuery extends QueryHandlerAsync<CorporativeFindManyQueryPayload, PaginationResponse<CorporativeModel>> { }

export class CorporativeFindManyQueryImpl implements CorporativeFindManyQuery {
    constructor(
        private readonly repository: CorporativeRepository
    ) { }
    async handleAsync(query: CorporativeFindManyQueryPayload): Promise<PaginationResponse<CorporativeModel>> {
        const filter: Filter<CorporativeModel>[] = [];
        if (query.filter) {
            filter.push({ field: 'corporativeName', operator: 'like', value: query.filter });
        }
        const data = await this.repository.findManyAsync({ ...query, filter: filter });
        const amount = await this.repository.countAsync(filter);
        return { data, amount };
    }
}