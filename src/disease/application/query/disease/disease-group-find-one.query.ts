import { DiseaseGroupNotFoundError } from "@omega/disease/core/domain/errors/disease-group.errors";
import { DiseaseGroupModel } from "@omega/disease/core/model/disease/disease-group.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { DiseaseGroupRepository } from "../../repository/model.repositories";

export type DiseaseGroupFindOneQueryPayload = {
    groupId: string;
};
export class DiseaseGroupFindOneQuery implements QueryHandlerAsync<DiseaseGroupFindOneQueryPayload, DiseaseGroupModel> {
    constructor(
        private readonly repository: DiseaseGroupRepository
    ) { }

    async handleAsync(value: DiseaseGroupFindOneQueryPayload): Promise<DiseaseGroupModel> {
        const group = await this.repository.findOneAsync([{ field: 'groupId', operator: 'eq', value: value.groupId }]);
        if (!group) throw new DiseaseGroupNotFoundError(value.groupId);
        return group;
    }
}