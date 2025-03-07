import { Injectable, Provider } from "@nestjs/common";
import { AuthRemoveResourceCommand } from "@omega/auth/application/command/auth/auth-remove-resource.command";
import { AuthRepository } from "@omega/auth/application/repository/auth/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { AuthRemoveResourceCommandToken } from "../../inject/command.inject";

@Injectable()
class AuthRemoveResourceNestCommand extends AuthRemoveResourceCommand {
    constructor(
        @InjectAggregateRepository('Auth') repository: AuthRepository
    ) {
        super(repository);
    }
}

export const AuthRemoveResourceCommandProvider: Provider = {
    provide: AuthRemoveResourceCommandToken,
    useClass: AuthRemoveResourceNestCommand
}