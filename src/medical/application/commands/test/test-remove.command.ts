import { CommandHandlerAsync } from "@shared/shared/application";
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { TestRepository } from "../../repository/aggregate.repositories";

export type TestRemoveCommandPayload = {
    testId: string;
};
export interface TestRemoveCommand extends CommandHandlerAsync<TestRemoveCommandPayload, void> { }

export class TestRemoveCommandImpl implements TestRemoveCommand {
    constructor(
        private readonly repository: TestRepository,
    ) { }

    async handleAsync(value: TestRemoveCommandPayload): Promise<void> {
        const test = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.testId }] });
        if (!test) throw new TestNotFoundError(value.testId);
        test.remove();
        await this.repository.saveAsync(test);
    }
}