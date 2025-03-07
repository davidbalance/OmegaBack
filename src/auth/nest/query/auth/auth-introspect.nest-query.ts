import { Injectable, Provider } from "@nestjs/common";
import { InjectJwt } from "@shared/shared/nest/inject";
import { AuthIntrospectQuery } from "@omega/auth/application/query/auth/auth-introspect.query";
import { JwtProvider } from "@shared/shared/providers/jwt.provider";
import { AuthIntrospectQueryToken } from "../../inject/query.inject";

@Injectable()
class AuthIntrospectNestQuery extends AuthIntrospectQuery {
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