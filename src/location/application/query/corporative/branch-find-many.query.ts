import { BranchModel } from "@omega/location/core/models/corporative/branch.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { Order, Filter } from "@shared/shared/domain";
import { BranchRepository } from "../../repository/model.repositories";

export type BranchFindManyQueryPayload = {
    companyId: string;
    filter?: string;
} & Order<BranchModel>;
export interface BranchFindManyQuery extends QueryHandlerAsync<BranchFindManyQueryPayload, BranchModel[]> { }

export class BranchFindManyQueryImpl implements BranchFindManyQuery {
    constructor(
        private readonly repository: BranchRepository
    ) { }

    async handleAsync(query: BranchFindManyQueryPayload): Promise<BranchModel[]> {
        const filter: Filter<BranchModel>[] = [{ field: 'companyId', operator: 'eq', value: query.companyId }];
        if (query.filter) {
            filter.push({ field: 'branchName', operator: 'like', value: query.filter });
        }
        return this.repository.findManyAsync({ ...query, filter });
    }
}