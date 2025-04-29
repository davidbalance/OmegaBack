import { Injectable, Provider } from "@nestjs/common";
import { TestRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { TestRemoveCommandToken } from "../../inject/command.inject";
import { TestRemoveCommandImpl } from "@omega/medical/application/commands/test/test-remove.command";

@Injectable()
class TestRemoveNestCommand extends TestRemoveCommandImpl {
    constructor(
        @InjectAggregateRepository("Test") repository: TestRepository
    ) {
        super(repository);
    }
}

export const TestRemoveCommandProvider: Provider = {
    provide: TestRemoveCommandToken,
    useClass: TestRemoveNestCommand
}