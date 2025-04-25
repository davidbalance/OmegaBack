import { ExamTypeModel } from "@omega/laboratory/core/model/exam/exam-type.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { Filter, Order, Pagination } from "@shared/shared/domain";
import { PaginationResponse } from "@shared/shared/nest/pagination-response";
import { ExamTypeRepository } from "../../repository/model.repositories";

export type ExamTypeFindManyQueryPayload = {
    filter?: string;
} & Order<ExamTypeModel> & Required<Pagination>
export interface ExamTypeFindManyQuery extends QueryHandlerAsync<ExamTypeFindManyQueryPayload, PaginationResponse<ExamTypeModel>> { }

export class ExamTypeFindManyQueryImpl implements ExamTypeFindManyQuery {
    constructor(
        private readonly repository: ExamTypeRepository
    ) { }

    async handleAsync(query: ExamTypeFindManyQueryPayload): Promise<PaginationResponse<ExamTypeModel>> {
        const filter: Filter<ExamTypeModel>[] = []
        if (query.filter) {
            filter.push({ field: 'typeName', operator: 'like', value: query.filter });
        }
        const data = await this.repository.findManyAsync({
            ...query,
            filter: filter
        });

        const amount = await this.repository.countAsync(filter);
        return { data, amount };
    }
}