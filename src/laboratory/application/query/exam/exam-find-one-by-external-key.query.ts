import { ExamModel } from "@omega/laboratory/core/model/exam/exam.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { ExternalKeyProps } from "@shared/shared/domain/external-key.value-object";
import { ExamExternalConnectionRepository, ExamRepository } from "../../repository/model.repositories";
import { ExamExternalKeyNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-external-key.errors";
import { ExamNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam.errors";

export type ExamFindOneByExternalKeyQueryPayload = ExternalKeyProps;
export class ExamFindOneByExternalKeyQuery implements QueryHandlerAsync<ExamFindOneByExternalKeyQueryPayload, ExamModel> {
    constructor(
        private readonly externalConnectionRepository: ExamExternalConnectionRepository,
        private readonly modelRepository: ExamRepository
    ) { }

    async handleAsync(query: ExamFindOneByExternalKeyQueryPayload): Promise<ExamModel> {
        const value = await this.externalConnectionRepository.findOneAsync([
            { field: 'examExternalOwner', operator: 'eq', value: query.owner },
            { field: 'examExternalKey', operator: 'eq', value: query.value },
        ]);

        if (!value) throw new ExamExternalKeyNotFoundError(query.owner, query.value);

        const exam = await this.modelRepository.findOneAsync([{ field: 'examId', operator: 'eq', value: value.examId }]);
        if (!exam) throw new ExamNotFoundError(value.examId);

        return exam;
    }
}