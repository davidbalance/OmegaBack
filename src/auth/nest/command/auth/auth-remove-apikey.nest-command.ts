import { Injectable, Provider } from "@nestjs/common";
import { AuthRemoveApiKeyCommand } from "@omega/auth/application/command/auth/auth-remove-apikey.command";
import { AuthRepository } from "@omega/auth/application/repository/auth/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { AuthRemoveApiKeyCommandToken } from "../../inject/command.inject";

@Injectable()
class AuthRemoveApiKeyNestCommand extends AuthRemoveApiKeyCommand {
    constructor(
        @InjectAggregateRepository('Auth') repository: AuthRepository
    ) {
        super(repository);
    }
}

export const AuthRemoveApiKeyCommandProvider: Provider = {
    provide: AuthRemoveApiKeyCommandToken,
    useClass: AuthRemoveApiKeyNestCommand
}