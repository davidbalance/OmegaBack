import { BranchExternalConnectionModel } from "@omega/location/core/models/corporative/branch-external-connection.model";
import { Resolver, ResolverPayload } from "@shared/shared/application/resolver.interface";

export type BranchExternalSourceResolverPayload = ResolverPayload & {
    owner: string;
    corporativeId: string;
    companyId: string;
    cityId: number;
    branchKey: string;
    branchName: string;
}
export interface BranchExternalSourceResolver
    extends Resolver<BranchExternalSourceResolverPayload, BranchExternalConnectionModel> { }