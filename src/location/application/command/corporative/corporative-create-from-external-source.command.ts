import { ExternalKeyCommandPayload } from "@shared/shared/domain/external-key.value-object";
import { CorporativeRepository } from "../../repository/aggregate.repositories";
import { CorporativeExternalConnectionRepository } from "../../repository/model.repositories";
import { CorporativeExternalKeyConflictError } from "@omega/location/core/domain/corporative/errors/corporative-external-key.errors";
import { Corporative } from "@omega/location/core/domain/corporative/corporative.domain";
import { CorporativeCreateCommandPayload } from "./corporative-create.command";
import { CommandHandlerAsync } from "@shared/shared/application";

export type CorporativeCreateFromExternalSourceCommandPayload = CorporativeCreateCommandPayload & ExternalKeyCommandPayload;
export interface CorporativeCreateFromExternalSourceCommand extends CommandHandlerAsync<CorporativeCreateFromExternalSourceCommandPayload, void> { }

export class CorporativeCreateFromExternalSourceCommandImpl implements CorporativeCreateFromExternalSourceCommand {

    constructor(
        private readonly externalConnectionRepository: CorporativeExternalConnectionRepository,
        private readonly aggregateRepository: CorporativeRepository
    ) { }

    async handleAsync(value: CorporativeCreateFromExternalSourceCommandPayload): Promise<void> {
        const externalConnection = await this.externalConnectionRepository.findOneAsync([
            { field: 'corporativeExternalOwner', operator: 'eq', value: value.externalKeyOwner },
            { field: 'corporativeExternalKey', operator: 'eq', value: value.externalKeyValue },
        ]);
        if (externalConnection) throw new CorporativeExternalKeyConflictError(value.externalKeyOwner, value.externalKeyValue);

        let corporative = await this.aggregateRepository.findOneAsync({ filter: [{ field: 'name', operator: 'eq', value: value.name }] });
        if (!corporative) {
            corporative = Corporative.create({ ...value });
        }
        corporative.addExternalKey({ owner: value.externalKeyOwner, value: value.externalKeyValue });
        await this.aggregateRepository.saveAsync(corporative);
    }
}