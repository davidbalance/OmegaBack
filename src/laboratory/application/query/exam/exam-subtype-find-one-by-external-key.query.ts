import { QueryHandlerAsync } from "@shared/shared/application";
import { ExternalKeyProps } from "@shared/shared/domain/external-key.value-object";
import { ExamSubtypeExternalConnectionRepository } from "../../repository/model.repositories";
import { ExamSubtypeModel } from "@omega/laboratory/core/model/exam/exam-subtype.model";
import { ExamSubtypeExternalKeyNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-subtype-external-key.errors";
import { ExamSubtypeFindOneQuery } from "./exam-subtype-find-one.query";

export type ExamSubtypeFindOneByExternalKeyQueryPayload = ExternalKeyProps;
export interface ExamSubtypeFindOneByExternalKeyQuery extends QueryHandlerAsync<ExamSubtypeFindOneByExternalKeyQueryPayload, ExamSubtypeModel> { }

export class ExamSubtypeFindOneByExternalKeyQueryImpl implements ExamSubtypeFindOneByExternalKeyQuery {
    constructor(
        private readonly externalConnectionRepository: ExamSubtypeExternalConnectionRepository,
        private readonly findOneQuery: ExamSubtypeFindOneQuery
    ) { }

    async handleAsync(query: ExamSubtypeFindOneByExternalKeyQueryPayload): Promise<ExamSubtypeModel> {
        const value = await this.externalConnectionRepository.findOneAsync([
            { field: 'subtypeExternalOwner', operator: 'eq', value: query.owner },
            { field: 'subtypeExternalKey', operator: 'eq', value: query.value },
        ]);

        if (!value) throw new ExamSubtypeExternalKeyNotFoundError(query.owner, query.value);
        return this.findOneQuery.handleAsync({ subtypeId: value.subtypeId });
    }
}