import { DiseaseGroupNotFoundError } from "@omega/disease/core/domain/errors/disease-group.errors";
import { CommandHandlerAsync } from "@shared/shared/application";
import { DiseaseGroupRepository } from "../../repository/aggregate.repositories";

export type DiseaseMoveToGroupCommandPayload = {
    toGroupId: string;
    fromGroupId: string;
    diseaseId: string;
};
export class DiseaseMoveToGroupCommand implements CommandHandlerAsync<DiseaseMoveToGroupCommandPayload, void> {
    constructor(
        private readonly repository: DiseaseGroupRepository
    ) { }

    async handleAsync(value: DiseaseMoveToGroupCommandPayload): Promise<void> {
        const fromGroup = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.fromGroupId }] });
        if (!fromGroup) throw new DiseaseGroupNotFoundError(value.fromGroupId);

        const toGroup = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.toGroupId }] });
        if (!toGroup) throw new DiseaseGroupNotFoundError(value.toGroupId);

        fromGroup.moveDiseaseTo(toGroup, value.diseaseId);

        await this.repository.saveAsync(fromGroup);
    }
}