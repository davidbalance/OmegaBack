import { CorporativeExternalConnectionModel } from "@omega/location/core/models/corporative/corporative-external-connection.model";
import { Resolver, ResolverPayload } from "@shared/shared/application/resolver.interface";

export type CorporativeExternalSourceResolverPayload = ResolverPayload & {
    owner: string;
    corporativeKey: string;
    corporativeName: string;
}
export interface CorporativeExternalSourceResolver
    extends Resolver<CorporativeExternalSourceResolverPayload, CorporativeExternalConnectionModel> { }