import { ExamExternalConnectionRepository } from "../repository/model.repositories";
import { Filter } from "@shared/shared/domain";
import { ExamExternalSourceResolver, ExamExternalSourceResolverPayload } from "../resolver/exam-external-source.resolver";
import { ExamSubtypeExternalSourceResolver, ExamSubtypeExternalSourceResolverPayload } from "../resolver/exam-subtype-external-source.resolver";
import { ExamTypeExternalSourceResolver, ExamTypeExternalSourceResolverPayload } from "../resolver/exam-type-external-source.resolver";
import { CreateFromExternalSource, CreateFromExternalSourcePayload } from "@shared/shared/application/from-external-source.interface";
import { ExamExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-external-connection.model";

export type CreateExamFromExternalSourcePayload = CreateFromExternalSourcePayload & ExamTypeExternalSourceResolverPayload & ExamSubtypeExternalSourceResolverPayload & ExamExternalSourceResolverPayload;
export class CreateExamFromExternalSourceService
    implements CreateFromExternalSource<CreateExamFromExternalSourcePayload, ExamExternalConnectionModel> {
    constructor(
        private readonly externalConnection: ExamExternalConnectionRepository,
        private readonly typeResolver: ExamTypeExternalSourceResolver,
        private readonly subtypeResolver: ExamSubtypeExternalSourceResolver,
        private readonly examResolver: ExamExternalSourceResolver,
    ) { }

    async createAsync(value: CreateExamFromExternalSourcePayload): Promise<ExamExternalConnectionModel> {
        const filter: Filter<ExamExternalConnectionModel>[] = [
            { field: 'examExternalKey', operator: 'eq', value: value.examKey },
            { field: 'examExternalOwner', operator: 'eq', value: value.owner },
        ]

        const externalExam = await this.externalConnection.findOneAsync(filter);
        if (externalExam) {
            return externalExam;
        }

        const externalType = await this.typeResolver.resolve(value);
        const externalSubtype = await this.subtypeResolver.resolve({ ...value, typeId: externalType.typeId });
        return await this.examResolver.resolve({ ...value, typeId: externalType.typeId, subtypeId: externalSubtype.subtypeId });
    }
}