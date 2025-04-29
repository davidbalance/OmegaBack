import { ExamTypeNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-type.errors";
import { ExamTypeModel } from "@omega/laboratory/core/model/exam/exam-type.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { ExamTypeRepository } from "../../repository/model.repositories";

export type ExamTypeFindOneQueryPayload = {
    typeId: string;
}
export interface ExamTypeFindOneQuery extends QueryHandlerAsync<ExamTypeFindOneQueryPayload, ExamTypeModel> { }

export class ExamTypeFindOneQueryImpl implements ExamTypeFindOneQuery {
    constructor(
        private readonly repository: ExamTypeRepository
    ) { }

    async handleAsync(query: ExamTypeFindOneQueryPayload): Promise<ExamTypeModel> {
        const value = await this.repository.findOneAsync([{ field: 'typeId', operator: 'eq', value: query.typeId }]);
        if (!value) throw new ExamTypeNotFoundError(query.typeId);
        return value;
    }
}