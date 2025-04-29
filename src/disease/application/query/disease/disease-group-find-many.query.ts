import { DiseaseGroupModel } from "@omega/disease/core/model/disease/disease-group.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { Filter, Order, Pagination } from "@shared/shared/domain";
import { DiseaseGroupRepository } from "../../repository/model.repositories";
import { PaginationResponse } from "@shared/shared/nest/pagination-response";

export type DiseaseGroupFindManyQueryPayload = {
    filter?: string;
} & Required<Pagination> & Order<DiseaseGroupModel>;
export interface DiseaseGroupFindManyQuery extends QueryHandlerAsync<DiseaseGroupFindManyQueryPayload, PaginationResponse<DiseaseGroupModel>> { }

export class DiseaseGroupFindManyQueryImpl implements DiseaseGroupFindManyQuery {
    constructor(
        private readonly repository: DiseaseGroupRepository
    ) { }

    async handleAsync(query: DiseaseGroupFindManyQueryPayload): Promise<PaginationResponse<DiseaseGroupModel>> {
        const filter: Filter<DiseaseGroupModel>[] = [];
        if (query.filter) {
            filter.push({ field: 'groupName', operator: 'like', value: query.filter });
        }

        const data = await this.repository.findManyAsync({ ...query, filter: filter });
        const amount = await this.repository.countAsync(filter);

        return { data, amount };
    }
}