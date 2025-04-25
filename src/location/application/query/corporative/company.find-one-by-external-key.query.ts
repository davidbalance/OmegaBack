import { QueryHandlerAsync } from "@shared/shared/application";
import { ExternalKeyProps } from "@shared/shared/domain/external-key.value-object";
import { CompanyExternalConnectionRepository, CompanyRepository } from "../../repository/model.repositories";
import { CompanyModel } from "@omega/location/core/models/corporative/company.model";
import { CompanyNotFoundError } from "@omega/location/core/domain/corporative/errors/company.errors";
import { CompanyExternalKeyNotFoundError } from "@omega/location/core/domain/corporative/errors/company-external-key.errors";

export type CompanyFindOneByExternalKeyQueryPayload = ExternalKeyProps;
export interface CompanyFindOneByExternalKeyQuery extends QueryHandlerAsync<CompanyFindOneByExternalKeyQueryPayload, CompanyModel> { }

export class CompanyFindOneByExternalKeyQueryImpl implements CompanyFindOneByExternalKeyQuery {
    constructor(
        private readonly externalConnectionRepository: CompanyExternalConnectionRepository,
        private readonly modelRepository: CompanyRepository
    ) { }

    async handleAsync(query: CompanyFindOneByExternalKeyQueryPayload): Promise<CompanyModel> {
        const value = await this.externalConnectionRepository.findOneAsync([
            { field: 'companyExternalOwner', operator: 'eq', value: query.owner },
            { field: 'companyExternalKey', operator: 'eq', value: query.value },
        ]);

        if (!value) throw new CompanyExternalKeyNotFoundError(query.owner, query.value);

        const company = await this.modelRepository.findOneAsync([{ field: 'companyId', operator: 'eq', value: value.companyId }]);
        if (!company) throw new CompanyNotFoundError(value.companyId);

        return company;
    }
}