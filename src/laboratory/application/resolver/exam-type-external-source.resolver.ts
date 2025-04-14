import { ExamTypeExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-type-external-connection.model";
import { Resolver, ResolverPayload } from "@shared/shared/application/resolver.interface";

export type ExamTypeExternalSourceResolverPayload = ResolverPayload & {
    owner: string;
    typeKey: string;
    typeName: string;
}
export interface ExamTypeExternalSourceResolver
    extends Resolver<ExamTypeExternalSourceResolverPayload, ExamTypeExternalConnectionModel> { }