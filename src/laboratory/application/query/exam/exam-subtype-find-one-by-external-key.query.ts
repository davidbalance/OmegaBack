import { QueryHandlerAsync } from "@shared/shared/application";
import { ExternalKeyProps } from "@shared/shared/domain/external-key.value-object";
import { ExamSubtypeExternalConnectionRepository, ExamSubtypeRepository } from "../../repository/model.repositories";
import { ExamSubtypeModel } from "@omega/laboratory/core/model/exam/exam-subtype.model";
import { ExamSubtypeNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-subtype.errors";
import { ExamSubtypeExternalKeyNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-subtype-external-key.errors";

export type ExamSubtypeFindOneByExternalKeyQueryPayload = ExternalKeyProps;
export class ExamSubtypeFindOneByExternalKeyQuery implements QueryHandlerAsync<ExamSubtypeFindOneByExternalKeyQueryPayload, ExamSubtypeModel> {
    constructor(
        private readonly externalConnectionRepository: ExamSubtypeExternalConnectionRepository,
        private readonly modelRepository: ExamSubtypeRepository
    ) { }

    async handleAsync(query: ExamSubtypeFindOneByExternalKeyQueryPayload): Promise<ExamSubtypeModel> {
        const value = await this.externalConnectionRepository.findOneAsync([
            { field: 'subtypeExternalOwner', operator: 'eq', value: query.owner },
            { field: 'subtypeExternalKey', operator: 'eq', value: query.value },
        ]);

        if (!value) throw new ExamSubtypeExternalKeyNotFoundError(query.owner, query.value);

        const exam = await this.modelRepository.findOneAsync([{ field: 'subtypeId', operator: 'eq', value: value.subtypeId }]);
        if (!exam) throw new ExamSubtypeNotFoundError(value.subtypeId);

        return exam;
    }
}