import { Injectable, Provider } from "@nestjs/common";
import { AuthAddResourcesCommand } from "@omega/auth/application/command/auth/auth-add-resources.command";
import { AuthRepository } from "@omega/auth/application/repository/auth/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { AuthAddResourcesCommandToken } from "../../inject/command.inject";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ResourceRepository } from "@omega/auth/application/repository/resource/model.repositories";

@Injectable()
class AuthAddResourcesNestCommand extends AuthAddResourcesCommand {
    constructor(
        @InjectAggregateRepository('Auth') repository: AuthRepository,
        @InjectModelRepository('Resource') resource: ResourceRepository
    ) {
        super(repository, resource);
    }
}

export const AuthAddResourcesCommandProvider: Provider = {
    provide: AuthAddResourcesCommandToken,
    useClass: AuthAddResourcesNestCommand
}