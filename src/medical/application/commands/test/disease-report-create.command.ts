import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { CreateDiseaseReportPayload } from "@omega/medical/core/domain/test/payloads/test.payloads";
import { CommandHandlerAsync } from "@shared/shared/application";
import { TestRepository } from "../../repository/aggregate.repositories";

export type DiseaseReportCreateCommandPayload = {
    testId: string;
} & CreateDiseaseReportPayload;

export interface DiseaseReportCreateCommand extends CommandHandlerAsync<DiseaseReportCreateCommandPayload, void> { }

export class DiseaseReportCreateCommandImpl implements DiseaseReportCreateCommand {

    constructor(
        private readonly repository: TestRepository
    ) { }

    async handleAsync(value: DiseaseReportCreateCommandPayload): Promise<void> {
        const test = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.testId }] });
        if (!test) throw new TestNotFoundError(value.testId);

        test.addDisease(value);
        await this.repository.saveAsync(test);
    }
}