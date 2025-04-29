import { TestExternalConnectionRepository, TestInnerRepository } from "../../repository/model.repositories";
import { TestRepository } from "../../repository/aggregate.repositories";
import { ExternalKeyCommandPayload } from "@shared/shared/domain/external-key.value-object";
import { TestExternalKeyConflictError } from "@omega/medical/core/domain/test/errors/test-external-key.errors";
import { Test } from "@omega/medical/core/domain/test/test.domain";
import { BaseTestCreateCommand } from "./base.test-create.command";
import { CommandHandlerAsync } from "@shared/shared/application";
import { TestCreateCommandPayload } from "./test-create.command";

export type TestCreateFromExternalSourceCommandPayload = TestCreateCommandPayload & ExternalKeyCommandPayload;

export type TestCreateFromExternalSourceCommand = CommandHandlerAsync<TestCreateFromExternalSourceCommandPayload, void>;

export class TestCreateFromExternalSourceCommandImpl
    extends BaseTestCreateCommand<TestCreateFromExternalSourceCommandPayload>
    implements TestCreateFromExternalSourceCommand {

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

        const exists = await this.getAggregate(value);
        let test: Test;
        if (exists) {
            test = await this.reactivateTest(exists.testId, exists.isActive);
        } else {
            test = Test.create({ ...value });
        }
        test.addExternalKey({ owner: value.externalKeyOwner, value: value.externalKeyValue });
        await this.aggregateRepository.saveAsync(test);
    }
}