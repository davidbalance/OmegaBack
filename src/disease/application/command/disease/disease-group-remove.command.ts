import { DiseaseGroupNotFoundError } from "@omega/disease/core/domain/errors/disease-group.errors";
import { CommandHandlerAsync } from "@shared/shared/application";
import { DiseaseGroupRepository } from "../../repository/aggregate.repositories";

export type DiseaseGroupRemoveCommandPayload = {
    groupId: string;
};
export interface DiseaseGroupRemoveCommand extends CommandHandlerAsync<DiseaseGroupRemoveCommandPayload, void> { }

export class DiseaseGroupRemoveCommandImpl implements DiseaseGroupRemoveCommand {
    constructor(
        private readonly repository: DiseaseGroupRepository
    ) { }

    async handleAsync(value: DiseaseGroupRemoveCommandPayload): Promise<void> {
        const group = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.groupId }] });
        if (!group) throw new DiseaseGroupNotFoundError(value.groupId);

        group.remove();

        await this.repository.saveAsync(group);
    }
}