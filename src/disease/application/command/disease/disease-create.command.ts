import { DiseaseGroupNotFoundError } from "@omega/disease/core/domain/errors/disease-group.errors";
import { AddDiseaseToGroupPayload } from "@omega/disease/core/domain/payloads/disease-group.payloads";
import { CommandHandlerAsync } from "@shared/shared/application";
import { DiseaseGroupRepository } from "../../repository/aggregate.repositories";

export type DiseaseCreateCommandPayload = {
    groupId: string
} & AddDiseaseToGroupPayload;
export interface DiseaseCreateCommand extends CommandHandlerAsync<DiseaseCreateCommandPayload, void> { }

export class DiseaseCreateCommandImpl implements DiseaseCreateCommand {
    constructor(
        private readonly repository: DiseaseGroupRepository
    ) { }

    async handleAsync(value: DiseaseCreateCommandPayload): Promise<void> {
        const group = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.groupId }] });
        if (!group) throw new DiseaseGroupNotFoundError(value.groupId);

        group.addDisease(value);

        await this.repository.saveAsync(group);
    }
}