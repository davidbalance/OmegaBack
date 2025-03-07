import { Injectable, Provider } from "@nestjs/common";
import { TestRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { TestCheckCommandToken } from "../../inject/command.inject";
import { TestCheckCommand } from "@omega/medical/application/commands/test/test-check.command";

@Injectable()
class TestCheckNestCommand extends TestCheckCommand {
    constructor(
        @InjectAggregateRepository("Test") repository: TestRepository
    ) {
        super(repository);
    }
}

export const TestCheckCommandProvider: Provider = {
    provide: TestCheckCommandToken,
    useClass: TestCheckNestCommand
}