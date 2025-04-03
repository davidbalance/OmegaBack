import { CompanyExternalConnectionModel } from "@omega/location/core/models/corporative/company-external-connection.model";
import { Resolver, ResolverPayload } from "@shared/shared/application/resolver.interface";

export type CompanyExternalSourceResolverPayload = ResolverPayload & {
    owner: string;
    corporativeId: string;
    companyKey: string;
    companyName: string;
    companyRuc: string;
    companyAddress: string;
    companyPhone: string;
}
export interface CompanyExternalSourceResolver
    extends Resolver<CompanyExternalSourceResolverPayload, CompanyExternalConnectionModel> { }