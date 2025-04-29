import { CommandHandlerAsync } from "@shared/shared/application";
import { AggregateRepository } from "@shared/shared/providers/aggregate.repository";
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { Test, TestProps } from "@omega/medical/core/domain/test/test.domain";

export type ReportRemoveContentCommandPayload = {
    testId: string;
}
export interface ReportRemoveContentCommand extends CommandHandlerAsync<ReportRemoveContentCommandPayload, void> { }

export class ReportRemoveContentCommandImpl implements ReportRemoveContentCommandImpl {
    constructor(
        private readonly repository: AggregateRepository<TestProps, Test>,
    ) { }

    async handleAsync(value: ReportRemoveContentCommandPayload): Promise<void> {
        const test = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.testId }] });
        if (!test) throw new TestNotFoundError(value.testId);

        test.removeReport();
        await this.repository.saveAsync(test);
    }
}