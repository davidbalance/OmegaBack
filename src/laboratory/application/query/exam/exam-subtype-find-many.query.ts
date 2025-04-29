import { ExamSubtypeModel } from "@omega/laboratory/core/model/exam/exam-subtype.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { Filter, Order, Pagination } from "@shared/shared/domain";
import { ExamSubtypeRepository } from "../../repository/model.repositories";
import { PaginationResponse } from "@shared/shared/nest/pagination-response";

export type ExamSubtypeFindManyQueryPayload = {
    typeId: string;
    filter?: string;
} & Order<ExamSubtypeModel> & Required<Pagination>
export interface ExamSubtypeFindManyQuery extends QueryHandlerAsync<ExamSubtypeFindManyQueryPayload, PaginationResponse<ExamSubtypeModel>> { }

export class ExamSubtypeFindManyQueryImpl implements QueryHandlerAsync<ExamSubtypeFindManyQueryPayload, PaginationResponse<ExamSubtypeModel>> {
    constructor(
        private readonly repository: ExamSubtypeRepository
    ) { }

    async handleAsync(query: ExamSubtypeFindManyQueryPayload): Promise<PaginationResponse<ExamSubtypeModel>> {
        const filter: Filter<ExamSubtypeModel>[] = [{ field: 'typeId', operator: 'eq', value: query.typeId }];
        if (query.filter) {
            filter.push({ field: 'subtypeName', operator: 'like', value: query.filter });
        }

        const data = await this.repository.findManyAsync({
            ...query,
            filter: filter
        });
        const amount = await this.repository.countAsync(filter);
        return { data, amount };
    }
}