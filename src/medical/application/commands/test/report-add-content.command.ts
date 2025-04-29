import { CommandHandlerAsync } from "@shared/shared/application";
import { AggregateRepository } from "@shared/shared/providers/aggregate.repository";
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { Test, TestProps } from "@omega/medical/core/domain/test/test.domain";

export type ReportAddContentCommandPayload = {
    testId: string;
    content: string;
}
export interface ReportAddContentCommand extends CommandHandlerAsync<ReportAddContentCommandPayload, void> { }

export class ReportAddContentCommandImpl implements ReportAddContentCommand {
    constructor(
        private readonly repository: AggregateRepository<TestProps, Test>,
    ) { }

    async handleAsync(value: ReportAddContentCommandPayload): Promise<void> {
        const test = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.testId }] });
        if (!test) throw new TestNotFoundError(value.testId);

        test.addReport(value.content);
        await this.repository.saveAsync(test);
    }

}