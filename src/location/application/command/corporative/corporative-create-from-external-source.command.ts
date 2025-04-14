import { ExternalKeyCommandPayload } from "@shared/shared/domain/external-key.value-object";
import { BaseCorporativeCreateCommand, BaseCorporativeCreateCommandPayload } from "./base.corporative-create.command";
import { CorporativeRepository } from "../../repository/aggregate.repositories";
import { CorporativeExternalConnectionRepository } from "../../repository/model.repositories";
import { CorporativeExternalKeyConflictError } from "@omega/location/core/domain/corporative/errors/corporative-external-key.errors";

export type CorporativeCreateFromExternalSourceCommandPayload = BaseCorporativeCreateCommandPayload & ExternalKeyCommandPayload;
export class CorporativeCreateFromExternalSourceCommand extends BaseCorporativeCreateCommand<CorporativeCreateFromExternalSourceCommandPayload> {

    constructor(
        private readonly externalConnectionRepository: CorporativeExternalConnectionRepository,
        aggregateRepository: CorporativeRepository
    ) {
        super(aggregateRepository);
    }

    async handleAsync(value: CorporativeCreateFromExternalSourceCommandPayload): Promise<void> {
        const externalConnection = await this.externalConnectionRepository.findOneAsync([
            { field: 'corporativeExternalOwner', operator: 'eq', value: value.externalKeyOwner },
            { field: 'corporativeExternalKey', operator: 'eq', value: value.externalKeyValue },
        ]);
        if (externalConnection) throw new CorporativeExternalKeyConflictError(value.externalKeyOwner, value.externalKeyValue);

        let corporative = await this.aggregateRepository.findOneAsync({ filter: [{ field: 'name', operator: 'eq', value: value.name }] });
        if (!corporative) {
            corporative = this.createCorporative(value);
        }
        corporative.addExternalKey({ owner: value.externalKeyOwner, value: value.externalKeyValue });
        await this.aggregateRepository.saveAsync(corporative);
    }
}