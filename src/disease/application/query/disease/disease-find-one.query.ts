import { DiseaseGroupNotFoundError } from "@omega/disease/core/domain/errors/disease-group.errors";
import { DiseaseModel } from "@omega/disease/core/model/disease/disease.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { DiseaseRepository } from "../../repository/model.repositories";

export type DiseaseFindOneQueryPayload = {
    diseaseId: string;
};
export interface DiseaseFindOneQuery extends QueryHandlerAsync<DiseaseFindOneQueryPayload, DiseaseModel> { }

export class DiseaseFindOneQueryImpl implements DiseaseFindOneQuery {
    constructor(
        private readonly repository: DiseaseRepository
    ) { }

    async handleAsync(value: DiseaseFindOneQueryPayload): Promise<DiseaseModel> {
        let group: DiseaseModel | null = null;
        group = await this.repository.findOneAsync([{ field: 'diseaseId', operator: 'eq', value: value.diseaseId }]);
        if (!group) throw new DiseaseGroupNotFoundError(value.diseaseId);
        return group;
    }
}