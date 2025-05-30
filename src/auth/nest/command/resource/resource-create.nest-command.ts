import { Injectable, Provider } from "@nestjs/common";
import { ResourceCreateCommandImpl } from "@omega/auth/application/command/resource/resource-create.command";
import { ResourceRepository } from "@omega/auth/application/repository/resource/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { ResourceCreateCommandToken } from "../../inject/command.inject";

@Injectable()
class ResourceCreateNestCommand extends ResourceCreateCommandImpl {
    constructor(
        @InjectAggregateRepository('Resource') repository: ResourceRepository
    ) {
        super(repository);
    }
}

export const ResourceCreateCommandProvider: Provider = {
    provide: ResourceCreateCommandToken,
    useClass: ResourceCreateNestCommand
}