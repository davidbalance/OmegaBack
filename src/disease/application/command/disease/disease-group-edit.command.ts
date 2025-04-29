import { DiseaseGroupNotFoundError } from "@omega/disease/core/domain/errors/disease-group.errors";
import { CommandHandlerAsync } from "@shared/shared/application";
import { DiseaseGroupRepository } from "../../repository/aggregate.repositories";

export type DiseaseGroupEditCommandPayload = {
    groupId: string;
    groupName: string;
};
export interface DiseaseGroupEditCommand extends CommandHandlerAsync<DiseaseGroupEditCommandPayload, void> { }

export class DiseaseGroupEditCommandImpl implements DiseaseGroupEditCommand {
    constructor(
        private readonly repository: DiseaseGroupRepository
    ) { }

    async handleAsync(value: DiseaseGroupEditCommandPayload): Promise<void> {
        const group = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.groupId }] });
        if (!group) throw new DiseaseGroupNotFoundError(value.groupId);

        group.rename(value.groupName);

        await this.repository.saveAsync(group);
    }
}