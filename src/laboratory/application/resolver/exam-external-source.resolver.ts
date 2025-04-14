import { ExamExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-external-connection.model";
import { Resolver, ResolverPayload } from "@shared/shared/application/resolver.interface";

export type ExamExternalSourceResolverPayload = ResolverPayload & {
    owner: string;
    examKey: string;
    examName: string;
    typeId: string;
    subtypeId: string;
}
export interface ExamExternalSourceResolver
    extends Resolver<ExamExternalSourceResolverPayload, ExamExternalConnectionModel> { }