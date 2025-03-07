import { ExamSubtypeNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-subtype.errors";
import { ExamSubtypeModel } from "@omega/laboratory/core/model/exam/exam-subtype.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { ModelRepository } from "@shared/shared/providers";

export type ExamSubtypeFindOneQueryPayload = {
    subtypeId: string;
}
export class ExamSubtypeFindOneQuery implements QueryHandlerAsync<ExamSubtypeFindOneQueryPayload, ExamSubtypeModel> {
    constructor(
        private readonly repository: ModelRepository<ExamSubtypeModel>
    ) { }

    async handleAsync(query: ExamSubtypeFindOneQueryPayload): Promise<ExamSubtypeModel> {
        const value = await this.repository.findOneAsync([{ field: 'subtypeId', operator: 'eq', value: query.subtypeId }]);
        if (!value) throw new ExamSubtypeNotFoundError(query.subtypeId);
        return value;
    }
}