import { Injectable, Provider } from "@nestjs/common";
import { ResourceRemoveCommandImpl } from "@omega/auth/application/command/resource/resource-remove.command";
import { ResourceRepository } from "@omega/auth/application/repository/resource/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { ResourceRemoveCommandToken } from "../../inject/command.inject";

@Injectable()
class ResourceRemoveNestCommand extends ResourceRemoveCommandImpl {
    constructor(
        @InjectAggregateRepository('Resource') repository: ResourceRepository
    ) {
        super(repository);
    }
}

export const ResourceRemoveCommandProvider: Provider = {
    provide: ResourceRemoveCommandToken,
    useClass: ResourceRemoveNestCommand
}