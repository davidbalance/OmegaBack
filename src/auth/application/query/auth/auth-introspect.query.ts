import { QueryHandlerAsync } from "@shared/shared/application";
import { AuthIntrospect, AuthJwtPayload } from "../../type/auth.type";
import { JwtProvider } from "@shared/shared/providers/jwt.provider";

export type AuthIntrospectQueryPayload = {
    jwt: string
};
export interface AuthIntrospectQuery extends QueryHandlerAsync<AuthIntrospectQueryPayload, AuthIntrospect> { }

export class AuthIntrospectQueryImpl implements AuthIntrospectQuery {
    constructor(
        private readonly jwt: JwtProvider,
    ) { }

    async handleAsync(value: AuthIntrospectQueryPayload): Promise<AuthIntrospect> {
        return new Promise<AuthIntrospect>((resolve) => {
            try {
                const introspect = this.jwt.validateJwt<AuthJwtPayload>(value.jwt);
                resolve({ ...introspect, active: true });
            } catch (error) {
                console.error(error);
                resolve({ active: false });
            }
        })
    }
}