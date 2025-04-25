import { QueryHandlerAsync } from "@shared/shared/application";
import { ModelRepository } from "@shared/shared/providers/model.repository";
import { DiseaseReportModel } from "@omega/medical/core/model/test/disease-report.model";

export type DiseaseReportFindManyQueryPayload = {
    testId: string;
}

export interface DiseaseReportFindManyQuery extends QueryHandlerAsync<DiseaseReportFindManyQueryPayload, DiseaseReportModel[]> { }

export class DiseaseReportFindManyQueryImpl implements DiseaseReportFindManyQuery {
    constructor(
        private readonly repository: ModelRepository<DiseaseReportModel>
    ) { }

    async handleAsync(query: DiseaseReportFindManyQueryPayload): Promise<DiseaseReportModel[]> {
        return this.repository.findManyAsync({ filter: [{ field: 'testId', operator: 'eq', value: query.testId }] });
    }
}