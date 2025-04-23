import { QueryHandlerAsync } from "@shared/shared/application";
import { ModelRepository } from "@shared/shared/providers/model.repository";
import { DiseaseReportModel } from "@omega/medical/core/model/test/disease-report.model";
import { DiseaseReportNotFoundError } from "@omega/medical/core/domain/test/errors/disease-report.errors";

export type DiseaseReportFindOneQueryPayload = {
    diseaseReportId: string;
}
export class DiseaseReportFindOneQuery implements QueryHandlerAsync<DiseaseReportFindOneQueryPayload, DiseaseReportModel> {
    constructor(
        private readonly repository: ModelRepository<DiseaseReportModel>
    ) { }

    async handleAsync(query: DiseaseReportFindOneQueryPayload): Promise<DiseaseReportModel> {
        const value = await this.repository.findOneAsync([{ field: 'diseaseReportId', operator: 'eq', value: query.diseaseReportId }]);
        if (!value) throw new DiseaseReportNotFoundError(query.diseaseReportId);
        return value;
    }
}