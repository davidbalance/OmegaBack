import { ExternalKeyCommandPayload } from "@shared/shared/domain/external-key.value-object";
import { CorporativeRepository } from "../../repository/aggregate.repositories";
import { CompanyExternalConnectionRepository, CompanyRepository } from "../../repository/model.repositories";
import { BaseCompanyCreateCommand, BaseCompanyCreateCommandPayload } from "./base.company-create.command";
import { CompanyExternalKeyConflictError } from "@omega/location/core/domain/corporative/errors/company-external-key.errors";

export type CompanyCreateFromExternalSourceCommandPayload = BaseCompanyCreateCommandPayload & ExternalKeyCommandPayload;
export class CompanyCreateFromExternalSourceCommand extends BaseCompanyCreateCommand<CompanyCreateFromExternalSourceCommandPayload> {

    constructor(
        private readonly externalConnectionRepository: CompanyExternalConnectionRepository,
        private readonly modelRepository: CompanyRepository,
        aggregateRepository: CorporativeRepository
    ) {
        super(aggregateRepository);
    }

    async handleAsync(value: CompanyCreateFromExternalSourceCommandPayload): Promise<void> {
        const externalConnection = await this.externalConnectionRepository.findOneAsync([
            { field: 'companyExternalOwner', operator: 'eq', value: value.externalKeyOwner },
            { field: 'companyExternalKey', operator: 'eq', value: value.externalKeyValue },
        ]);
        if (externalConnection) throw new CompanyExternalKeyConflictError(value.externalKeyOwner, value.externalKeyValue);

        const corporative = await this.getAggregate(value);

        const company = await this.modelRepository.findOneAsync([
            { field: 'corporativeId', operator: 'eq', value: value.corporativeId },
            { field: 'companyRuc', operator: 'eq', value: value.ruc },
        ]);
        let companyId: string;
        if (!company) {
            corporative.addCompany(value);
            const newBranch = [...corporative.companies].pop()!;
            companyId = newBranch.id;
        } else {
            companyId = company.companyId;
        }


        corporative.addExternalKeyToCompany({ companyId: companyId, owner: value.externalKeyOwner, value: value.externalKeyValue });
        await this.aggregateRepository.saveAsync(corporative);
    }
}