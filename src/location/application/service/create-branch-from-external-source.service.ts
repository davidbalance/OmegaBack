import { CreateFromExternalSource, CreateFromExternalSourcePayload } from "@shared/shared/application/from-external-source.interface";
import { CorporativeExternalSourceResolver, CorporativeExternalSourceResolverPayload } from "../resolver/corporative-external-source.resolver";
import { CompanyExternalSourceResolver, CompanyExternalSourceResolverPayload } from "../resolver/company-external-source.resolver";
import { BranchExternalSourceResolver, BranchExternalSourceResolverPayload } from "../resolver/branch-external-source.resolver";
import { BranchExternalConnectionRepository } from "../repository/model.repositories";
import { Filter } from "@shared/shared/domain";
import { BranchExternalConnectionModel } from "@omega/location/core/models/corporative/branch-external-connection.model";

export type CreateBranchFromExternalSourcePayload = CreateFromExternalSourcePayload & CorporativeExternalSourceResolverPayload &
    Omit<CompanyExternalSourceResolverPayload, 'corporativeId'> &
    Omit<BranchExternalSourceResolverPayload, 'corporativeId' | 'companyId'>;
export class CreateBranchFromExternalSourceService
    implements CreateFromExternalSource<CreateBranchFromExternalSourcePayload, BranchExternalConnectionModel> {
    constructor(
        private readonly externalConnection: BranchExternalConnectionRepository,
        private readonly corporativeResolver: CorporativeExternalSourceResolver,
        private readonly companyResolver: CompanyExternalSourceResolver,
        private readonly branchResolver: BranchExternalSourceResolver,
    ) { }

    async createAsync(value: CreateBranchFromExternalSourcePayload): Promise<BranchExternalConnectionModel> {
        const filter: Filter<BranchExternalConnectionModel>[] = [
            { field: 'branchExternalKey', operator: 'eq', value: value.branchKey },
            { field: 'branchExternalOwner', operator: 'eq', value: value.owner },
        ]

        const externalExam = await this.externalConnection.findOneAsync(filter);
        if (externalExam) {
            return externalExam;
        }

        const externalCorporative = await this.corporativeResolver.resolve(value);
        const externalCompany = await this.companyResolver.resolve({ ...value, corporativeId: externalCorporative.corporativeId });
        return await this.branchResolver.resolve({ ...value, corporativeId: externalCorporative.corporativeId, companyId: externalCompany.companyId });
    }
}