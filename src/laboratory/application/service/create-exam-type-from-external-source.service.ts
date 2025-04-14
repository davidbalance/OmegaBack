import { ExamTypeExternalSourceResolver, ExamTypeExternalSourceResolverPayload } from "../resolver/exam-type-external-source.resolver";
import { CreateFromExternalSource, CreateFromExternalSourcePayload } from "@shared/shared/application/from-external-source.interface";
import { ExamTypeExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-type-external-connection.model";

export type CreateExamTypeFromExternalSourcePayload = CreateFromExternalSourcePayload & ExamTypeExternalSourceResolverPayload;
export class CreateExamTypeFromExternalSourceService
    implements CreateFromExternalSource<CreateExamTypeFromExternalSourcePayload, ExamTypeExternalConnectionModel> {
    constructor(
        private readonly typeResolver: ExamTypeExternalSourceResolver
    ) { }
    async createAsync(value: CreateExamTypeFromExternalSourcePayload): Promise<ExamTypeExternalConnectionModel> {
        return await this.typeResolver.resolve({ ...value });
    }
}