import { ExternalKeyCommandPayload } from "@shared/shared/domain/external-key.value-object";
import { CorporativeRepository } from "../../repository/aggregate.repositories";
import { CompanyExternalConnectionRepository, CompanyRepository } from "../../repository/model.repositories";
import { CompanyExternalKeyConflictError } from "@omega/location/core/domain/corporative/errors/company-external-key.errors";
import { CorporativeNotFoundError } from "@omega/location/core/domain/corporative/errors/corporative.errors";
import { CommandHandlerAsync } from "@shared/shared/application";
import { CompanyCreateCommandPayload } from "./company-create.command";

export type CompanyCreateFromExternalSourceCommandPayload = CompanyCreateCommandPayload & ExternalKeyCommandPayload;
export interface CompanyCreateFromExternalSourceCommand extends CommandHandlerAsync<CompanyCreateFromExternalSourceCommandPayload, void> { }

export class CompanyCreateFromExternalSourceCommandImpl implements CompanyCreateFromExternalSourceCommand {

    constructor(
        private readonly externalConnectionRepository: CompanyExternalConnectionRepository,
        private readonly modelRepository: CompanyRepository,
        private readonly aggregateRepository: CorporativeRepository
    ) { }

    async handleAsync(value: CompanyCreateFromExternalSourceCommandPayload): Promise<void> {
        const externalConnection = await this.externalConnectionRepository.findOneAsync([
            { field: 'companyExternalOwner', operator: 'eq', value: value.externalKeyOwner },
            { field: 'companyExternalKey', operator: 'eq', value: value.externalKeyValue },
        ]);
        if (externalConnection) throw new CompanyExternalKeyConflictError(value.externalKeyOwner, value.externalKeyValue);

        const corporative = await this.aggregateRepository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.corporativeId }] });
        if (!corporative) throw new CorporativeNotFoundError(value.corporativeId);

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