import { ExamNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam.errors";
import { ExamModel } from "@omega/laboratory/core/model/exam/exam.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { ModelRepository } from "@shared/shared/providers";

export type ExamFindOneQueryPayload = {
    examId: string;
}
export interface ExamFindOneQuery extends QueryHandlerAsync<ExamFindOneQueryPayload, ExamModel> { }

export class ExamFindOneQueryImpl implements ExamFindOneQuery {
    constructor(
        private readonly repository: ModelRepository<ExamModel>
    ) { }

    async handleAsync(query: ExamFindOneQueryPayload): Promise<ExamModel> {
        const value = await this.repository.findOneAsync([{ field: 'examId', operator: 'eq', value: query.examId }]);
        if (!value) throw new ExamNotFoundError(query.examId);
        return value;
    }
}