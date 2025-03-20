import { CommandHandlerAsync } from "@shared/shared/application";
import { CreateTestPayload } from "@omega/medical/core/domain/test/payloads/test.payloads";
import { TestRepository as TestAggregateRepository } from "../../repository/aggregate.repositories";
import { TestInnerRepository } from "../../repository/model.repositories";
import { Test } from "@omega/medical/core/domain/test/test.domain";
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";

export type TestCreateCommandPayload = CreateTestPayload;
export class TestCreateCommand implements CommandHandlerAsync<TestCreateCommandPayload, void> {
    constructor(
        private readonly repository: TestAggregateRepository,
        private readonly model: TestInnerRepository
    ) { }

    async handleAsync(value: TestCreateCommandPayload): Promise<void> {
        const exists = await this.model.findOneAsync([
            { field: 'orderId', operator: 'eq', value: value.orderId },
            { field: 'examName', operator: 'eq', value: value.examName },
            { field: 'examSubtype', operator: 'eq', value: value.examSubtype },
            { field: 'examType', operator: 'eq', value: value.examType },
        ]);
        let test: Test;
        if (exists) {
            const value = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: exists.testId }] });
            if (!value) throw new TestNotFoundError(exists.testId);
            test = value;
            test.reactivate();
        } else {
            test = Test.create(value);
        }
        await this.repository.saveAsync(test);
    }
}