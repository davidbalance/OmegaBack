import { Injectable, Provider } from "@nestjs/common";
import { TestRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { TestEditExamCommandToken } from "../../inject/command.inject";
import { TestEditExamCommandImpl } from "@omega/medical/application/commands/test/test-edit-exam.command";

@Injectable()
class TestEditExamNestCommand extends TestEditExamCommandImpl {
    constructor(
        @InjectAggregateRepository("Test") repository: TestRepository
    ) {
        super(repository);
    }
}

export const TestEditExamCommandProvider: Provider = {
    provide: TestEditExamCommandToken,
    useClass: TestEditExamNestCommand
}