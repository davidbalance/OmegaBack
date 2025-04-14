import { CorporativeRepository } from "../../repository/aggregate.repositories";
import { BaseCompanyCreateCommand, BaseCompanyCreateCommandPayload } from "./base.company-create.command";

export type CompanyCreateCommandPayload = BaseCompanyCreateCommandPayload;
export class CompanyCreateCommand extends BaseCompanyCreateCommand<CompanyCreateCommandPayload> {
    constructor(
        aggregateRepository: CorporativeRepository
    ) {
        super(aggregateRepository);
    }

    async handleAsync(value: CompanyCreateCommandPayload): Promise<void> {
        const corporative = await this.getAggregate(value);

        corporative.addCompany(value);
        await this.aggregateRepository.saveAsync(corporative);
    }
}