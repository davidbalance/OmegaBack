import { Injectable, Provider } from "@nestjs/common";
import { AuthAddLogoCommandImpl } from "@omega/auth/application/command/auth/auth-add-logo.command";
import { AuthRepository } from "@omega/auth/application/repository/auth/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { AuthAddLogoCommandToken } from "../../inject/command.inject";

@Injectable()
class AuthAddLogoNestCommand extends AuthAddLogoCommandImpl {
    constructor(
        @InjectAggregateRepository('Auth') repository: AuthRepository
    ) {
        super(repository);
    }
}

export const AuthAddLogoCommandProvider: Provider = {
    provide: AuthAddLogoCommandToken,
    useClass: AuthAddLogoNestCommand
}