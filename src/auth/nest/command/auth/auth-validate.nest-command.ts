import { Injectable, Provider } from "@nestjs/common";
import { AuthValidateCommandImpl } from "@omega/auth/application/command/auth/auth-validate.command";
import { AuthRepository } from "@omega/auth/application/repository/auth/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { AuthValidateCommandToken } from "../../inject/command.inject";
import { PasswordProvider } from "@shared/shared/providers/password.provider";
import { InjectPassword } from "@shared/shared/nest/inject";

@Injectable()
class AuthValidateNestCommand extends AuthValidateCommandImpl {
    constructor(
        @InjectAggregateRepository('Auth') repository: AuthRepository,
        @InjectPassword() hash: PasswordProvider
    ) {
        super(repository, hash);
    }
}

export const AuthValidateCommandProvider: Provider = {
    provide: AuthValidateCommandToken,
    useClass: AuthValidateNestCommand
}