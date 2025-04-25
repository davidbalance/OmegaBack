import { Injectable, Provider } from "@nestjs/common";
import { AuthRemoveTokenCommandImpl } from "@omega/auth/application/command/auth/auth-remove-token.command";
import { AuthRepository } from "@omega/auth/application/repository/auth/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { AuthRemoveTokenCommandToken } from "../../inject/command.inject";
import { InjectJwt } from "@shared/shared/nest/inject";
import { JwtProvider } from "@shared/shared/providers/jwt.provider";

@Injectable()
class AuthRemoveTokenNestCommand extends AuthRemoveTokenCommandImpl {
    constructor(
        @InjectAggregateRepository('Auth') repository: AuthRepository,
        @InjectJwt('Access') jwt: JwtProvider
    ) {
        super(repository, jwt);
    }
}

export const AuthRemoveTokenCommandProvider: Provider = {
    provide: AuthRemoveTokenCommandToken,
    useClass: AuthRemoveTokenNestCommand
}