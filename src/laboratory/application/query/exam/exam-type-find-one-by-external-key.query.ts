import { QueryHandlerAsync } from "@shared/shared/application";
import { ExternalKeyProps } from "@shared/shared/domain/external-key.value-object";
import { ExamTypeExternalConnectionRepository } from "../../repository/model.repositories";
import { ExamTypeModel } from "@omega/laboratory/core/model/exam/exam-type.model";
import { ExamTypeExternalKeyNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-type-external-key.errors";
import { ExamTypeFindOneQuery } from "./exam-type-find-one.query";

export type ExamTypeFindOneByExternalKeyQueryPayload = ExternalKeyProps;
export class ExamTypeFindOneByExternalKeyQuery implements QueryHandlerAsync<ExamTypeFindOneByExternalKeyQueryPayload, ExamTypeModel> {
    constructor(
        private readonly externalConnectionRepository: ExamTypeExternalConnectionRepository,
        private readonly findOneQuery: ExamTypeFindOneQuery
    ) { }

    async handleAsync(query: ExamTypeFindOneByExternalKeyQueryPayload): Promise<ExamTypeModel> {
        const value = await this.externalConnectionRepository.findOneAsync([
            { field: 'typeExternalOwner', operator: 'eq', value: query.owner },
            { field: 'typeExternalKey', operator: 'eq', value: query.value },
        ]);

        if (!value) throw new ExamTypeExternalKeyNotFoundError(query.owner, query.value);

        return this.findOneQuery.handleAsync({ typeId: value.typeId });
    }
}