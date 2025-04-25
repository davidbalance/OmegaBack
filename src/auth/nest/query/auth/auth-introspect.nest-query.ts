import { Injectable, Provider } from "@nestjs/common";
import { InjectJwt } from "@shared/shared/nest/inject";
import { AuthIntrospectQueryImpl } from "@omega/auth/application/query/auth/auth-introspect.query";
import { JwtProvider } from "@shared/shared/providers/jwt.provider";
import { AuthIntrospectQueryToken } from "../../inject/query.inject";

@Injectable()
class AuthIntrospectNestQuery extends AuthIntrospectQueryImpl {
    constructor(
        @InjectJwt("Access") jwt: JwtProvider,
    ) {
        super(jwt);
    }
}

export const AuthIntrospectQueryProvider: Provider = {
    provide: AuthIntrospectQueryToken,
    useClass: AuthIntrospectNestQuery
}