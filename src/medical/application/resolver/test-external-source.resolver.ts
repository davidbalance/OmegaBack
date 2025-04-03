import { TestExternalConnectionModel } from "@omega/medical/core/model/test/test-external-connection";
import { Resolver, ResolverPayload } from "@shared/shared/application/resolver.interface";

export type TestExternalSourceResolverPayload = ResolverPayload & {
    owner: string;
    testKey: string;
    examName: string;
    examSubtype: string;
    examType: string;
    orderId: string;
}
export interface TestExternalSourceResolver
    extends Resolver<TestExternalSourceResolverPayload, TestExternalConnectionModel> { }