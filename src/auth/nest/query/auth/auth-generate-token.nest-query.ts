import { Injectable, Provider } from "@nestjs/common";
import { AuthGenerateTokenQueryImpl } from "@omega/auth/application/query/auth/auth-generate-token.query";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { AuthGenerateTokenQueryToken } from "../../inject/query.inject";
import { AuthRepository, AuthResourceRepository } from "@omega/auth/application/repository/auth/model.repositories";
import { InjectJwt } from "@shared/shared/nest/inject";
import { JwtProvider } from "@shared/shared/providers/jwt.provider";

@Injectable()
class AuthGenerateTokenNestQuery extends AuthGenerateTokenQueryImpl {
    constructor(
        @InjectModelRepository('Auth') auth: AuthRepository,
        @InjectModelRepository('AuthResource') resource: AuthResourceRepository,
        @InjectJwt('Access') jwt: JwtProvider
    ) {
        super(auth, resource, jwt);
    }
}

export const AuthGenerateTokenQueryProvider: Provider = {
    provide: AuthGenerateTokenQueryToken,
    useClass: AuthGenerateTokenNestQuery
}