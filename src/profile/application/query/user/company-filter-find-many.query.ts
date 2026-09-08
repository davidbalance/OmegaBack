import { QueryHandlerAsync } from "@shared/shared/application";
import { CompanyFilterRepository } from "../../repository/model.repositories";
import { CompanyFilterModel } from "@omega/profile/core/model/user/company-filter.model";
import { PaginationResponse } from "@shared/shared/nest/pagination-response";

export type CompanyFilterFindManyQueryPayload = {
    userId: string;
};
export interface CompanyFilterFindManyQuery extends QueryHandlerAsync<CompanyFilterFindManyQueryPayload, PaginationResponse<CompanyFilterModel>> { }

export class CompanyFilterFindManyQueryImpl implements CompanyFilterFindManyQuery {
    constructor(
        private readonly repository: CompanyFilterRepository
    ) { }

    async handleAsync(query: CompanyFilterFindManyQueryPayload): Promise<PaginationResponse<CompanyFilterModel>> {
        const data = await this.repository.findManyAsync({ filter: [{ field: 'userId', operator: 'eq', value: query.userId }] });
        return {
            amount: data.length,
            data
        };
    }
}