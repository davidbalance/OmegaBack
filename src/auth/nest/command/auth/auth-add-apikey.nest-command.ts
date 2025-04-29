import { Injectable, Provider } from "@nestjs/common";
import { AuthAddApiKeyCommandImpl } from "@omega/auth/application/command/auth/auth-add-apikey.command";
import { AuthRepository } from "@omega/auth/application/repository/auth/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { AuthAddApiKeyCommandToken } from "../../inject/command.inject";

@Injectable()
class AuthAddApiKeyNestCommand extends AuthAddApiKeyCommandImpl {
    constructor(
        @InjectAggregateRepository('Auth') repository: AuthRepository
    ) {
        super(repository);
    }
}

export const AuthAddApiKeyCommandProvider: Provider = {
    provide: AuthAddApiKeyCommandToken,
    useClass: AuthAddApiKeyNestCommand
}