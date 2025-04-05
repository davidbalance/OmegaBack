import { CreateFromExternalSource, CreateFromExternalSourcePayload } from "@shared/shared/application/from-external-source.interface";
import { CorporativeExternalSourceResolver, CorporativeExternalSourceResolverPayload } from "../resolver/corporative-external-source.resolver";
import { CompanyExternalSourceResolver, CompanyExternalSourceResolverPayload } from "../resolver/company-external-source.resolver";
import { CompanyExternalConnectionRepository } from "../repository/model.repositories";
import { Filter } from "@shared/shared/domain";
import { CompanyExternalConnectionModel } from "@omega/location/core/models/corporative/company-external-connection.model";

export type CreateCompanyFromExternalSourcePayload = CreateFromExternalSourcePayload & CorporativeExternalSourceResolverPayload & Omit<CompanyExternalSourceResolverPayload, 'corporativeId'>;
export class CreateCompanyFromExternalSourceService
    implements CreateFromExternalSource<CreateCompanyFromExternalSourcePayload, CompanyExternalConnectionModel> {
    constructor(
        private readonly externalConnection: CompanyExternalConnectionRepository,
        private readonly corporativeResolver: CorporativeExternalSourceResolver,
        private readonly companyResolver: CompanyExternalSourceResolver,
    ) { }

    async createAsync(value: CreateCompanyFromExternalSourcePayload): Promise<CompanyExternalConnectionModel> {
        const filter: Filter<CompanyExternalConnectionModel>[] = [
            { field: 'companyExternalKey', operator: 'eq', value: value.companyKey },
            { field: 'companyExternalOwner', operator: 'eq', value: value.owner },
        ]

        const externalExam = await this.externalConnection.findOneAsync(filter);
        if (externalExam) {
            return externalExam;
        }

        const externalCorporative = await this.corporativeResolver.resolve(value);
        return await this.companyResolver.resolve({ ...value, corporativeId: externalCorporative.corporativeId });
    }
}