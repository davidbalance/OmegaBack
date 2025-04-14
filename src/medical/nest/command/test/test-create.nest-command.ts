import { Injectable, Provider } from "@nestjs/common";
import { TestRepository as TestAggregateRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { TestCreateCommandToken } from "../../inject/command.inject";
import { TestCreateCommand } from "@omega/medical/application/commands/test/test-create.command";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { TestInnerRepository } from "@omega/medical/application/repository/model.repositories";

@Injectable()
class TestCreateNestCommand extends TestCreateCommand {
    constructor(
        @InjectAggregateRepository("Test") aggregate: TestAggregateRepository,
        @InjectModelRepository("TestInner") model: TestInnerRepository,
    ) {
        super(aggregate, model);
    }
}

export const TestCreateCommandProvider: Provider = {
    provide: TestCreateCommandToken,
    useClass: TestCreateNestCommand
}