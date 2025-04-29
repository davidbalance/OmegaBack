import { Injectable, Provider } from "@nestjs/common";
import { TestRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { TestUncheckCommandToken } from "../../inject/command.inject";
import { TestUncheckCommandImpl } from "@omega/medical/application/commands/test/test-uncheck.command";

@Injectable()
class TestUncheckNestCommand extends TestUncheckCommandImpl {
    constructor(
        @InjectAggregateRepository("Test") repository: TestRepository
    ) {
        super(repository);
    }
}

export const TestUncheckCommandProvider: Provider = {
    provide: TestUncheckCommandToken,
    useClass: TestUncheckNestCommand
}