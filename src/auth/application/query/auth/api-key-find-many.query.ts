import { ApiKeyModel } from "@omega/auth/core/model/auth/api_key.model";
import { ApiKeyRepository } from "../../repository/auth/model.repositories";
import { QueryHandlerAsync } from "@shared/shared/application";
import { JwtProvider } from "@shared/shared/providers/jwt.provider";
import { AuthJwtPayload } from "../../type/auth.type";

export type ApiKeyFindManyQueryPayload = {
    jwt: string
};
export class ApiKeyFindManyQuery implements QueryHandlerAsync<ApiKeyFindManyQueryPayload, ApiKeyModel[]> {
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