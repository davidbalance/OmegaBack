import { CorporativeNotFoundError } from "@omega/location/core/domain/corporative/errors/corporative.errors";
import { CommandHandlerAsync } from "@shared/shared/application";
import { CorporativeRepository } from "../../repository/aggregate.repositories";

export type CompanyMoveCommandPayload = {
    fromCorporativeId: string;
    toCorporativeId: string;
    companyId: string
};
export class CompanyMoveCommand implements CommandHandlerAsync<CompanyMoveCommandPayload, void> {
    constructor(
        private readonly repository: CorporativeRepository
    ) { }

    async handleAsync(value: CompanyMoveCommandPayload): Promise<void> {
        const fromCorporative = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.fromCorporativeId }] });
        if (!fromCorporative) throw new CorporativeNotFoundError(value.fromCorporativeId);

        const toCorporative = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.toCorporativeId }] });
        if (!toCorporative) throw new CorporativeNotFoundError(value.toCorporativeId);

        fromCorporative.moveCompanyTo(toCorporative, value.companyId);
        await this.repository.saveAsync(fromCorporative);
    }
}