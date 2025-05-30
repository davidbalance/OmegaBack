import { TestExternalConnectionModel } from "@omega/medical/core/model/test/test-external-connection.model";
import { Resolver, ResolverPayload } from "@shared/shared/application/resolver.interface";

export type TestExternalSourceResolverPayload = ResolverPayload & {
    owner: string;
    testKey: string;
    examName: string;
    examSubtype: string;
    examType: string;
    orderId: string;

    examTypeKey?: string;
    examSubtypeKey?: string;
    examKey?: string;
}
export interface TestExternalSourceResolver
    extends Resolver<TestExternalSourceResolverPayload, TestExternalConnectionModel> { }