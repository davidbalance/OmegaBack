import { Injectable, Provider } from "@nestjs/common";
import { AuthRefreshTokenCommandImpl } from "@omega/auth/application/command/auth/auth-refresh-token.command";
import { AuthRepository } from "@omega/auth/application/repository/auth/aggregate.repositories";
import { InjectJwt } from "@shared/shared/nest/inject";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { AuthRefreshTokenCommandToken } from "../../inject/command.inject";
import { JwtProvider } from "@shared/shared/providers/jwt.provider";
import { InjectQuery } from "../../inject/query.inject";
import { AuthGenerateTokenQuery } from "@omega/auth/application/query/auth/auth-generate-token.query";

@Injectable()
class AuthRefreshTokenNestCommand extends AuthRefreshTokenCommandImpl {
    constructor(
        @InjectAggregateRepository('Auth') repository: AuthRepository,
        @InjectQuery('AuthGenerateToken') generator: AuthGenerateTokenQuery,
        @InjectJwt('Access') accessJwt: JwtProvider,
        @InjectJwt('Refresh') refreshJwt: JwtProvider
    ) {
        super(repository, generator, accessJwt, refreshJwt);
    }
}

export const AuthRefreshTokenCommandProvider: Provider = {
    provide: AuthRefreshTokenCommandToken,
    useClass: AuthRefreshTokenNestCommand
}