import { Injectable, Provider } from "@nestjs/common";
import { AuthEditPasswordCommandImpl } from "@omega/auth/application/command/auth/auth-edit-password.command";
import { AuthRepository } from "@omega/auth/application/repository/auth/aggregate.repositories";
import { InjectPassword } from "@shared/shared/nest/inject";
import { PasswordProvider } from "@shared/shared/providers/password.provider";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { AuthEditPasswordCommandToken } from "../../inject/command.inject";

@Injectable()
class AuthEditPasswordNestCommand extends AuthEditPasswordCommandImpl {
    constructor(
        @InjectAggregateRepository('Auth') repository: AuthRepository,
        @InjectPassword() hash: PasswordProvider
    ) {
        super(repository, hash);
    }
}

export const AuthEditPasswordCommandProvider: Provider = {
    provide: AuthEditPasswordCommandToken,
    useClass: AuthEditPasswordNestCommand
}