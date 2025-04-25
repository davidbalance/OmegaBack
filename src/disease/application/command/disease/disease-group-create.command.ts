import { DiseaseGroup } from "@omega/disease/core/domain/disease-group.domain";
import { DiseaseGroupConflictError } from "@omega/disease/core/domain/errors/disease-group.errors";
import { CreateDiseaseGroupPayload } from "@omega/disease/core/domain/payloads/disease-group.payloads";
import { CommandHandlerAsync } from "@shared/shared/application";
import { DiseaseGroupRepository } from "../../repository/aggregate.repositories";

export type DiseaseGroupCreateCommandPayload = CreateDiseaseGroupPayload;
export interface DiseaseGroupCreateCommand extends CommandHandlerAsync<DiseaseGroupCreateCommandPayload, void> { }

export class DiseaseGroupCreateCommandImpl implements DiseaseGroupCreateCommand {
    constructor(
        private readonly repository: DiseaseGroupRepository
    ) { }

    async handleAsync(value: DiseaseGroupCreateCommandPayload): Promise<void> {
        const exists = await this.repository.findOneAsync({ filter: [{ field: 'name', operator: 'eq', value: value.name }] });
        if (exists) throw new DiseaseGroupConflictError(value.name);

        const group = DiseaseGroup.create(value);

        await this.repository.saveAsync(group);
    }
}