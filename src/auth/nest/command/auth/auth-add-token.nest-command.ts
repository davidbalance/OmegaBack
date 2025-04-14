import { Injectable, Provider } from "@nestjs/common";
import { AuthAddTokenCommand } from "@omega/auth/application/command/auth/auth-add-token.command";
import { AuthRepository } from "@omega/auth/application/repository/auth/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { AuthAddTokenCommandToken } from "../../inject/command.inject";

@Injectable()
class AuthAddTokenNestCommand extends AuthAddTokenCommand {
    constructor(
        @InjectAggregateRepository('Auth') repository: AuthRepository,
    ) {
        super(repository);
    }
}

export const AuthAddTokenCommandProvider: Provider = {
    provide: AuthAddTokenCommandToken,
    useClass: AuthAddTokenNestCommand
}