import { Injectable, Provider } from "@nestjs/common";
import { AuthAccessTokenCommand } from "@omega/auth/application/command/auth/auth-access-token.command";
import { AuthAccessTokenCommandToken } from "../../inject/command.inject";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { AuthRepository } from "@omega/auth/application/repository/auth/aggregate.repositories";
import { InjectJwt } from "@shared/shared/nest/inject";
import { JwtProvider } from "@shared/shared/providers/jwt.provider";
import { InjectQuery } from "../../inject/query.inject";
import { AuthGenerateTokenQuery } from "@omega/auth/application/query/auth/auth-generate-token.query";

@Injectable()
class AuthAccessTokenNestCommand extends AuthAccessTokenCommand {
    constructor(
        @InjectAggregateRepository('Auth') repository: AuthRepository,
        @InjectQuery('AuthGenerateToken') token: AuthGenerateTokenQuery,
        @InjectJwt('Refresh') jwt: JwtProvider
    ) {
        super(repository, token, jwt);
    }
}

export const AuthAccessTokenCommandProvider: Provider = {
    provide: AuthAccessTokenCommandToken,
    useClass: AuthAccessTokenNestCommand
}