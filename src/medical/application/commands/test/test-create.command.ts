import { Test } from "@omega/medical/core/domain/test/test.domain";
import { BaseTestCreateCommand, BaseTestCreateCommandPayload } from "./base.test-create.command";

export type TestCreateCommandPayload = BaseTestCreateCommandPayload;
export class TestCreateCommand extends BaseTestCreateCommand<TestCreateCommandPayload> {

    async handleAsync(value: TestCreateCommandPayload): Promise<void> {
        const exists = await this.getTest(value);
        let test: Test;
        if (exists) {
            test = await this.reactivateTest(exists.testId, exists.isActive);
        } else {
            test = this.createTest(value, value.orderId);
        }
        await this.aggregateRepository.saveAsync(test);
    }
}