import { CorporativeNotFoundError } from "@omega/location/core/domain/corporative/errors/corporative.errors";
import { AddCompanyToCorporativePayload } from "@omega/location/core/domain/corporative/payloads/corporative.payloads";
import { CommandHandlerAsync } from "@shared/shared/application";
import { CorporativeRepository } from "../../repository/aggregate.repositories";

export type CompanyCreateCommandPayload = {
    corporativeId: string
} & AddCompanyToCorporativePayload;
export class CompanyCreateCommand implements CommandHandlerAsync<CompanyCreateCommandPayload, void> {
    constructor(
        private readonly repository: CorporativeRepository
    ) { }

    async handleAsync(value: CompanyCreateCommandPayload): Promise<void> {
        const corporative = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.corporativeId }] });
        if (!corporative) throw new CorporativeNotFoundError(value.corporativeId);

        corporative.addCompany(value);
        await this.repository.saveAsync(corporative);
    }
}