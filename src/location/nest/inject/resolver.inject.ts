import { Inject } from "@nestjs/common";

export const CorporativeExternalSourceResolverToken = 'CorporativeExternalSourceResolver';
export const CompanyExternalSourceResolverToken = 'CompanyExternalSourceResolver';
export const BranchExternalSourceResolverToken = 'BranchExternalSourceResolver';

const resolver = {
    CorporativeExternalSource: CorporativeExternalSourceResolverToken,
    CompanyExternalSource: CompanyExternalSourceResolverToken,
    BranchExternalSource: BranchExternalSourceResolverToken,
}

export const InjectResolver = (token: keyof typeof resolver) => Inject(resolver[token]);