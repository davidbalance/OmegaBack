import { CommandHandlerAsync } from "@shared/shared/application";
import { CorporativeRepository } from "../../repository/aggregate.repositories";
import { AddCompanyToCorporativePayload } from "@omega/location/core/domain/corporative/payloads/corporative.payloads";
import { CorporativeNotFoundError } from "@omega/location/core/domain/corporative/errors/corporative.errors";

export type CompanyCreateCommandPayload = {
    corporativeId: string
} & AddCompanyToCorporativePayload;
export interface CompanyCreateCommand extends CommandHandlerAsync<CompanyCreateCommandPayload, void> { }

export class CompanyCreateCommandImpl implements CompanyCreateCommand {
    constructor(
        private readonly aggregateRepository: CorporativeRepository
    ) { }

    async handleAsync(value: CompanyCreateCommandPayload): Promise<void> {
        const corporative = await this.aggregateRepository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.corporativeId }] });
        if (!corporative) throw new CorporativeNotFoundError(value.corporativeId);

        corporative.addCompany(value);
        await this.aggregateRepository.saveAsync(corporative);
    }
}