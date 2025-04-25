import { DiseaseGroupNotFoundError } from "@omega/disease/core/domain/errors/disease-group.errors";
import { CommandHandlerAsync } from "@shared/shared/application";
import { DiseaseGroupRepository } from "../../repository/aggregate.repositories";

export type DiseaseRemoveCommandPayload = {
    groupId: string;
    diseaseId: string;
};
export interface DiseaseRemoveCommand extends CommandHandlerAsync<DiseaseRemoveCommandPayload, void> { }

export class DiseaseRemoveCommandImpl implements DiseaseRemoveCommand {
    constructor(
        private readonly repository: DiseaseGroupRepository
    ) { }

    async handleAsync(value: DiseaseRemoveCommandPayload): Promise<void> {
        const group = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.groupId }] });
        if (!group) throw new DiseaseGroupNotFoundError(value.groupId);

        group.removeDisease(value.diseaseId);

        await this.repository.saveAsync(group);
    }
}