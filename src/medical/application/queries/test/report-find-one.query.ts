import { QueryHandlerAsync } from "@shared/shared/application";
import { ReportModel } from "@omega/medical/core/model/test/report.model";
import { ReportRepository } from "../../repository/model.repositories";
import { ReportNotFoundError } from "@omega/medical/core/domain/test/errors/report.errors";

export type ReportFindOneQueryPayload = {
    testId: string;
}
export interface ReportFindOneQuery extends QueryHandlerAsync<ReportFindOneQueryPayload, ReportModel> { }

export class ReportFindOneQueryImpl implements ReportFindOneQuery {
    constructor(
        private readonly repository: ReportRepository
    ) { }

    async handleAsync(query: ReportFindOneQueryPayload): Promise<ReportModel> {
        const value = await this.repository.findOneAsync([{ field: 'testId', operator: 'eq', value: query.testId }]);
        if (!value) throw new ReportNotFoundError(query.testId);

        return value;
    }
}