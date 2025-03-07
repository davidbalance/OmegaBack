import { DiseaseGroupNotFoundError } from "@omega/disease/core/domain/errors/disease-group.errors";
import { RenameDiseaseFromGroupPayload } from "@omega/disease/core/domain/payloads/disease-group.payloads";
import { CommandHandlerAsync } from "@shared/shared/application";
import { DiseaseGroupRepository } from "../../repository/aggregate.repositories";

export type DiseaseEditCommandPayload = {
    groupId: string
} & RenameDiseaseFromGroupPayload;
export class DiseaseEditCommand implements CommandHandlerAsync<DiseaseEditCommandPayload, void> {
    constructor(
        private readonly repository: DiseaseGroupRepository
    ) { }

    async handleAsync(value: DiseaseEditCommandPayload): Promise<void> {
        const group = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.groupId }] });
        if (!group) throw new DiseaseGroupNotFoundError(value.groupId);

        group.renameDiseaseInGroup(value);

        await this.repository.saveAsync(group);
    }
}