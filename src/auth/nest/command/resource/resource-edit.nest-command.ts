import { Injectable, Provider } from "@nestjs/common";
import { ResourceEditCommandImpl } from "@omega/auth/application/command/resource/resource-edit.command";
import { ResourceRepository } from "@omega/auth/application/repository/resource/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { ResourceEditCommandToken } from "../../inject/command.inject";

@Injectable()
class ResourceEditNestCommand extends ResourceEditCommandImpl {
    constructor(
        @InjectAggregateRepository('Resource') repository: ResourceRepository
    ) {
        super(repository);
    }
}

export const ResourceEditCommandProvider: Provider = {
    provide: ResourceEditCommandToken,
    useClass: ResourceEditNestCommand
}