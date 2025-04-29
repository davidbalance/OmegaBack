import { Test } from "@omega/medical/core/domain/test/test.domain";
import { BaseTestCreateCommand, BaseTestCreateCommandPayload } from "./base.test-create.command";
import { CommandHandlerAsync } from "@shared/shared/application";

export type TestCreateCommandPayload = BaseTestCreateCommandPayload;

export interface TestCreateCommand extends CommandHandlerAsync<TestCreateCommandPayload, void> { }

export class TestCreateCommandImpl
    extends BaseTestCreateCommand<TestCreateCommandPayload>
    implements TestCreateCommand {

    async handleAsync(value: TestCreateCommandPayload): Promise<void> {
        const exists = await this.getAggregate(value);
        let test: Test;
        if (exists) {
            test = await this.reactivateTest(exists.testId, exists.isActive);
        } else {
            test = Test.create({ ...value });
        }
        await this.aggregateRepository.saveAsync(test);
    }
}