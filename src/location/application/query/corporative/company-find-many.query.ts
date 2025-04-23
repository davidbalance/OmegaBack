import { CompanyModel } from "@omega/location/core/models/corporative/company.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { Pagination, Order, Filter, FilterGroup } from "@shared/shared/domain";
import { CompanyRepository } from "../../repository/model.repositories";
import { PaginationResponse } from "@shared/shared/nest/pagination-response";

export type CompanyFindManyQueryPayload = {
    corporativeId: string;
    filter?: string;
} & Required<Pagination> & Order<CompanyModel>
export class CompanyFindManyQuery implements QueryHandlerAsync<CompanyFindManyQueryPayload, PaginationResponse<CompanyModel>> {
    constructor(
        private readonly repository: CompanyRepository
    ) { }

    async handleAsync(query: CompanyFindManyQueryPayload): Promise<PaginationResponse<CompanyModel>> {
        const filter: (Filter<CompanyModel> | FilterGroup<CompanyModel>)[] = [{ field: 'corporativeId', operator: 'eq', value: query.corporativeId }];
        if (query.filter) {
            filter.push({
                operator: 'or',
                filter: [
                    { field: 'companyName', operator: 'like', value: query.filter },
                    { field: 'companyRuc', operator: 'like', value: query.filter },
                ]
            });
        }

        const data = await this.repository.findManyAsync({ ...query, filter });
        const amount = await this.repository.countAsync(filter);
        return { data, amount };
    }
}