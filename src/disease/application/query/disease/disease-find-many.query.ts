import { DiseaseModel } from "@omega/disease/core/model/disease/disease.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { Filter, FilterGroup, Order, Pagination } from "@shared/shared/domain";
import { DiseaseRepository } from "../../repository/model.repositories";
import { PaginationResponse } from "@shared/shared/nest/pagination-response";

export type DiseaseFindManyQueryPayload = {
    groupId: string;
    filter?: string;
} & Required<Pagination> & Order<DiseaseModel>;
export class DiseaseFindManyQuery implements QueryHandlerAsync<DiseaseFindManyQueryPayload, PaginationResponse<DiseaseModel>> {
    constructor(
        private readonly repository: DiseaseRepository
    ) { }

    async handleAsync(value: DiseaseFindManyQueryPayload): Promise<PaginationResponse<DiseaseModel>> {
        const filter: (FilterGroup<DiseaseModel> | Filter<DiseaseModel>)[] = [{ field: 'groupId', operator: 'eq', value: value.groupId }];
        if (value.filter) {
            filter.push({ field: 'diseaseName', operator: 'like', value: value.filter });
        }

        const data = await this.repository.findManyAsync({
            ...value,
            filter: filter,
        });
        const amount = await this.repository.countAsync(filter);

        return { data, amount };
    }
}