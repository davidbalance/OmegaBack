import { CommandHandlerAsync } from "@shared/shared/application";
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { TestRepository } from "../../repository/aggregate.repositories";

export type TestUncheckCommandPayload = {
    testId: string;
};
export class TestUncheckCommand implements CommandHandlerAsync<TestUncheckCommandPayload, void> {
    constructor(
        private readonly repository: TestRepository,
    ) { }

    async handleAsync(value: TestUncheckCommandPayload): Promise<void> {
        const test = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.testId }] });
        if (!test) throw new TestNotFoundError(value.testId);
        test.uncheck();
        await this.repository.saveAsync(test);
    }
}