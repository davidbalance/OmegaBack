import { CommandHandlerAsync } from "@shared/shared/application";
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { TestRepository } from "../../repository/aggregate.repositories";

export type TestCheckCommandPayload = {
    testId: string;
};
export interface TestCheckCommand extends CommandHandlerAsync<TestCheckCommandPayload, void> { }

export class TestCheckCommandImpl implements TestCheckCommand {
    constructor(
        private readonly repository: TestRepository,
    ) { }

    async handleAsync(value: TestCheckCommandPayload): Promise<void> {
        const test = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.testId }] });
        if (!test) throw new TestNotFoundError(value.testId);
        test.check();
        await this.repository.saveAsync(test);
    }
}