import { CommandHandlerAsync } from "@shared/shared/application";
import { CreateTestPayload } from "@omega/medical/core/domain/test/payloads/test.payloads";
import { TestRepository as TestAggregateRepository } from "../../repository/aggregate.repositories";
import { TestRepository as TestModelRepository } from "../../repository/model.repositories";
import { Test } from "@omega/medical/core/domain/test/test.domain";
import { TestConflictError } from "@omega/medical/core/domain/test/errors/test.errors";

export type TestCreateCommandPayload = CreateTestPayload;
export class TestCreateCommand implements CommandHandlerAsync<TestCreateCommandPayload, void> {
    constructor(
        private readonly repository: TestAggregateRepository,
        private readonly model: TestModelRepository
    ) { }

    async handleAsync(value: TestCreateCommandPayload): Promise<void> {
        const exists = await this.model.findOneAsync([
            { field: 'orderId', operator: 'eq', value: value.orderId },
            { field: 'examName', operator: 'eq', value: value.examName },
            { field: 'examSubtype', operator: 'eq', value: value.examSubtype },
            { field: 'examType', operator: 'eq', value: value.examType },
        ]);
        if (exists) throw new TestConflictError();
        const test = Test.create(value);
        await this.repository.saveAsync(test);
    }
}