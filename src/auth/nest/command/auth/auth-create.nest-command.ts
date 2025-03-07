import { Injectable, Provider } from "@nestjs/common";
import { AuthCreateCommand } from "@omega/auth/application/command/auth/auth-create.command";
import { AuthRepository } from "@omega/auth/application/repository/auth/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { AuthCreateCommandToken } from "../../inject/command.inject";
import { InjectPassword } from "@shared/shared/nest/inject";
import { PasswordProvider } from "@shared/shared/providers/password.provider";

@Injectable()
class AuthCreateNestCommand extends AuthCreateCommand {
    constructor(
        @InjectAggregateRepository('Auth') repository: AuthRepository,
        @InjectPassword() hash: PasswordProvider
    ) {
        super(repository, hash);
    }
}

export const AuthCreateCommandProvider: Provider = {
    provide: AuthCreateCommandToken,
    useClass: AuthCreateNestCommand
}