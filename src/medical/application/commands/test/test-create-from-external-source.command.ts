import { TestExternalConnectionRepository, TestInnerRepository } from "../../repository/model.repositories";
import { TestRepository } from "../../repository/aggregate.repositories";
import { ExternalKeyCommandPayload } from "@shared/shared/domain/external-key.value-object";
import { TestExternalKeyConflictError } from "@omega/medical/core/domain/test/errors/test-external-key.errors";
import { Test } from "@omega/medical/core/domain/test/test.domain";
import { BaseTestCreateCommand, BaseTestCreateCommandPayload } from "./base.test-create.command";

export type TestCreateFromExternalSourceCommandPayload = BaseTestCreateCommandPayload & ExternalKeyCommandPayload;
export class TestCreateFromExternalSourceCommand extends BaseTestCreateCommand<TestCreateFromExternalSourceCommandPayload> {

    constructor(
        private readonly externalConnectionRepository: TestExternalConnectionRepository,
        aggregateRepository: TestRepository,
        modelRepository: TestInnerRepository
    ) {
        super(aggregateRepository, modelRepository);
    }

    async handleAsync(value: TestCreateFromExternalSourceCommandPayload): Promise<void> {
        const externalConnection = await this.externalConnectionRepository.findOneAsync([
            { field: 'testExternalKey', operator: 'eq', value: value.externalKeyValue },
            { field: 'testExternalOwner', operator: 'eq', value: value.externalKeyOwner },
        ]);
        if (externalConnection) throw new TestExternalKeyConflictError(value.externalKeyOwner, value.externalKeyValue);

        const exists = await this.getTest(value);
        let test: Test;
        if (exists) {
            test = await this.reactivateTest(exists.testId, exists.isActive);
        } else {
            test = this.createTest(value, value.orderId);
        }
        test.addExternalKey({ owner: value.externalKeyOwner, value: value.externalKeyValue });
        await this.aggregateRepository.saveAsync(test);
    }
}