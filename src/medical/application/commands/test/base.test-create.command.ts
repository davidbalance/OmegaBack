import { CommandHandlerAsync } from "@shared/shared/application";
import { CreateTestPayload } from "@omega/medical/core/domain/test/payloads/test.payloads";
import { TestRepository } from "../../repository/aggregate.repositories";
import { TestInnerRepository } from "../../repository/model.repositories";
import { Test } from "@omega/medical/core/domain/test/test.domain";
import { TestConflictError, TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { TestInnerModel } from "@prisma/client";

export type BaseTestCreateCommandPayload = CreateTestPayload;
export abstract class BaseTestCreateCommand<T extends BaseTestCreateCommandPayload> implements CommandHandlerAsync<T, void> {
    constructor(
        protected readonly aggregateRepository: TestRepository,
        private readonly modelRepository: TestInnerRepository
    ) { }

    protected async getTest(value: T): Promise<TestInnerModel | null> {
        const exists = await this.modelRepository.findOneAsync([
            { field: 'orderId', operator: 'eq', value: value.orderId },
            { field: 'examName', operator: 'eq', value: value.examName },
            { field: 'examSubtype', operator: 'eq', value: value.examSubtype },
            { field: 'examType', operator: 'eq', value: value.examType },
        ]);

        return exists;
    }

    protected async reactivateTest(testId: string, cannotReactivate: boolean): Promise<Test> {
        if (cannotReactivate) throw new TestConflictError();
        const value = await this.aggregateRepository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: testId }] });
        if (!value) throw new TestNotFoundError(testId);

        value.reactivate();
        return value;
    }

    protected createTest(value: T, orderId: string): Test {
        return Test.create({ ...value, orderId });
    }

    abstract handleAsync(value: T): Promise<void>;
}