import { ExamModel } from "@omega/laboratory/core/model/exam/exam.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { Filter, Order } from "@shared/shared/domain";
import { ExamRepository } from "../../repository/model.repositories";

export type ExamFindManyQueryPayload = {
    subtypeId: string;
    filter?: string;
} & Order<ExamModel>
export class ExamFindManyQuery implements QueryHandlerAsync<ExamFindManyQueryPayload, ExamModel[]> {
    constructor(
        private readonly repository: ExamRepository
    ) { }

    async handleAsync(query: ExamFindManyQueryPayload): Promise<ExamModel[]> {
        const filter: Filter<ExamModel>[] = [{ field: 'subtypeId', operator: 'eq', value: query.subtypeId }];
        if (query.filter) {
            filter.push({ field: 'examName', operator: 'like', value: query.filter });
        }

        return this.repository.findManyAsync({ ...query, filter: filter });
    }
}