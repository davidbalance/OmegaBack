import { Injectable, Provider } from "@nestjs/common";
import { TestRepository as TestAggregateRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { TestCreateFromExternalSourceCommandToken } from "../../inject/command.inject";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { TestExternalConnectionRepository, TestInnerRepository } from "@omega/medical/application/repository/model.repositories";
import { TestCreateFromExternalSourceCommandImpl } from "@omega/medical/application/commands/test/test-create-from-external-source.command";

@Injectable()
class TestCreateFromExternalSourceNestCommand extends TestCreateFromExternalSourceCommandImpl {
    constructor(
        @InjectModelRepository("TestExternalConnection") externalConnectionRepository: TestExternalConnectionRepository,
        @InjectAggregateRepository("Test") aggregateRepository: TestAggregateRepository,
        @InjectModelRepository("TestInner") modelRepository: TestInnerRepository
    ) {
        super(
            externalConnectionRepository,
            aggregateRepository,
            modelRepository
        );
    }
}

export const TestCreateFromExternalSourceCommandProvider: Provider = {
    provide: TestCreateFromExternalSourceCommandToken,
    useClass: TestCreateFromExternalSourceNestCommand
}