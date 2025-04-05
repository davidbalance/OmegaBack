import { ExamSubtypeExternalConnectionRepository } from "../repository/model.repositories";
import { Filter } from "@shared/shared/domain";
import { ExamSubtypeExternalSourceResolver, ExamSubtypeExternalSourceResolverPayload } from "../resolver/exam-subtype-external-source.resolver";
import { ExamTypeExternalSourceResolver, ExamTypeExternalSourceResolverPayload } from "../resolver/exam-type-external-source.resolver";
import { CreateFromExternalSource, CreateFromExternalSourcePayload } from "@shared/shared/application/from-external-source.interface";
import { ExamSubtypeExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-subtype-external-connection.model";

export type CreateExamSubtypeFromExternalSourcePayload = CreateFromExternalSourcePayload & ExamTypeExternalSourceResolverPayload & Omit<ExamSubtypeExternalSourceResolverPayload, 'typeId'>;
export class CreateExamSubtypeFromExternalSourceService
    implements CreateFromExternalSource<CreateExamSubtypeFromExternalSourcePayload, ExamSubtypeExternalConnectionModel> {
    constructor(
        private readonly externalConnection: ExamSubtypeExternalConnectionRepository,
        private readonly typeResolver: ExamTypeExternalSourceResolver,
        private readonly subtypeResolver: ExamSubtypeExternalSourceResolver,
    ) { }
    async createAsync(value: CreateExamSubtypeFromExternalSourcePayload): Promise<ExamSubtypeExternalConnectionModel> {
        const filter: Filter<ExamSubtypeExternalConnectionModel>[] = [
            { field: 'subtypeExternalKey', operator: 'eq', value: value.subtypeKey },
            { field: 'subtypeExternalOwner', operator: 'eq', value: value.owner },
        ]

        const externalExam = await this.externalConnection.findOneAsync(filter);
        if (externalExam) {
            return externalExam;
        }

        const externalType = await this.typeResolver.resolve(value);
        return await this.subtypeResolver.resolve({ ...value, typeId: externalType.typeId });
    }
}