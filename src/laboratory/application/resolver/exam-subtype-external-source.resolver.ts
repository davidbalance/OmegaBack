import { ExamSubtypeExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-subtype-external-connection.model";
import { Resolver, ResolverPayload } from "@shared/shared/application/resolver.interface";

export type ExamSubtypeExternalSourceResolverPayload = ResolverPayload & {
    owner: string;
    subtypeKey: string;
    subtypeName: string;
    typeId: string;
}
export interface ExamSubtypeExternalSourceResolver
    extends Resolver<ExamSubtypeExternalSourceResolverPayload, ExamSubtypeExternalConnectionModel> { }