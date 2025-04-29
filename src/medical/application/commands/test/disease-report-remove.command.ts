import { CommandHandlerAsync } from "@shared/shared/application";
import { AggregateRepository } from "@shared/shared/providers/aggregate.repository";
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { Test, TestProps } from "@omega/medical/core/domain/test/test.domain";

export type DiseaseReportRemoveCommandPayload = {
    testId: string;
    diseaseId: string;
}
export interface DiseaseReportRemoveCommand extends CommandHandlerAsync<DiseaseReportRemoveCommandPayload, void> { }

export class DiseaseReportRemoveCommandImpl implements DiseaseReportRemoveCommand {
    constructor(
        private readonly repository: AggregateRepository<TestProps, Test>
    ) { }

    async handleAsync(value: DiseaseReportRemoveCommandPayload): Promise<void> {
        const test = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.testId }] });
        if (!test) throw new TestNotFoundError(value.testId);

        test.removeDisease(value.diseaseId);
        await this.repository.saveAsync(test);
    }
}