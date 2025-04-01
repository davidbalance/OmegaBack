import { QueryHandlerAsync } from "@shared/shared/application";
import { ExternalKeyProps } from "@shared/shared/domain/external-key.value-object";
import { ExamTypeExternalConnectionRepository, ExamTypeRepository } from "../../repository/model.repositories";
import { ExamTypeModel } from "@omega/laboratory/core/model/exam/exam-type.model";
import { ExamTypeNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-type.errors";
import { ExamTypeExternalKeyNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-type-external-key.errors";

export type ExamTypeFindOneByExternalKeyQueryPayload = ExternalKeyProps;
export class ExamTypeFindOneByExternalKeyQuery implements QueryHandlerAsync<ExamTypeFindOneByExternalKeyQueryPayload, ExamTypeModel> {
    constructor(
        private readonly externalConnectionRepository: ExamTypeExternalConnectionRepository,
        private readonly modelRepository: ExamTypeRepository
    ) { }

    async handleAsync(query: ExamTypeFindOneByExternalKeyQueryPayload): Promise<ExamTypeModel> {
        const value = await this.externalConnectionRepository.findOneAsync([
            { field: 'typeExternalOwner', operator: 'eq', value: query.owner },
            { field: 'typeExternalKey', operator: 'eq', value: query.value },
        ]);

        if (!value) throw new ExamTypeExternalKeyNotFoundError(query.owner, query.value);

        const type = await this.modelRepository.findOneAsync([{ field: 'typeId', operator: 'eq', value: value.typeId }]);
        if (!type) throw new ExamTypeNotFoundError(value.typeId);

        return type;
    }
}