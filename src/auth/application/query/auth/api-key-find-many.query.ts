import { ApiKeyModel } from "@omega/auth/core/model/auth/api-key.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { JwtProvider } from "@shared/shared/providers/jwt.provider";
import { ApiKeyRepository } from "../../repository/auth/model.repositories";
import { AuthJwtPayload } from "../../type/auth.type";

export type ApiKeyFindManyQueryPayload = {
    jwt: string
};
export interface ApiKeyFindManyQuery extends QueryHandlerAsync<ApiKeyFindManyQueryPayload, ApiKeyModel[]> { }

export class ApiKeyFindManyQueryImpl implements ApiKeyFindManyQuery {
    constructor(
        private readonly jwt: JwtProvider,
        private readonly repository: ApiKeyRepository,
    ) { }

    async handleAsync(value: ApiKeyFindManyQueryPayload): Promise<ApiKeyModel[]> {
        const data = this.jwt.validateJwt<AuthJwtPayload>(value.jwt);
        const values = await this.repository.findManyAsync({ filter: [{ field: 'authId', operator: 'eq', value: data.sub }] });
        return values;
    }
}