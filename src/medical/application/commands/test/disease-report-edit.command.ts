import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { UpdateDiseaseReportPayload } from "@omega/medical/core/domain/test/payloads/test.payloads";
import { CommandHandlerAsync } from "@shared/shared/application";
import { TestRepository } from "../../repository/aggregate.repositories";

export type DiseaseReportEditCommandPayload = {
    testId: string;
    diseaseReportId: string;
} & Omit<UpdateDiseaseReportPayload, 'id'>;
export class DiseaseReportEditCommand implements CommandHandlerAsync<DiseaseReportEditCommandPayload, void> {

    constructor(
        private readonly repository: TestRepository
    ) { }

    async handleAsync(value: DiseaseReportEditCommandPayload): Promise<void> {
        const test = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.testId }] });
        if (!test) throw new TestNotFoundError(value.testId);

        test.updateDisease({ ...value, id: value.diseaseReportId });
        await this.repository.saveAsync(test);
    }
}