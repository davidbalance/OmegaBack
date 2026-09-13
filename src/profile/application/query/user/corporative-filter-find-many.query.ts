import { QueryHandlerAsync } from "@shared/shared/application";
import { CorporativeFilterRepository } from "../../repository/model.repositories";
import { PaginationResponse } from "@shared/shared/nest/pagination-response";
import { CorporativeFilterModel } from "@omega/profile/core/model/user/corporative-filter.model";

export type CorporativeFilterFindManyQueryPayload = {
    userId: string;
};
export interface CorporativeFilterFindManyQuery extends QueryHandlerAsync<CorporativeFilterFindManyQueryPayload, PaginationResponse<CorporativeFilterModel>> { }

export class CorporativeFilterFindManyQueryImpl implements CorporativeFilterFindManyQuery {
    constructor(
        private readonly repository: CorporativeFilterRepository
    ) { }

    async handleAsync(query: CorporativeFilterFindManyQueryPayload): Promise<PaginationResponse<CorporativeFilterModel>> {
        const data = await this.repository.findManyAsync({ filter: [{ field: 'userId', operator: 'eq', value: query.userId }] });
        return {
            amount: data.length,
            data
        };
    }
}