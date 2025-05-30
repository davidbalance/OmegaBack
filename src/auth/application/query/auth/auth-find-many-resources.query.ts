import { QueryHandlerAsync } from "@shared/shared/application";
import { AuthResourceRepository } from "../../repository/auth/model.repositories";
import { AuthResourceModel } from "@omega/auth/core/model/auth/auth-resource.model";

export type AuthFindManyResourcesQueryPayload = {
    authId: string
};
export interface AuthFindManyResourcesQuery extends QueryHandlerAsync<AuthFindManyResourcesQueryPayload, AuthResourceModel[]> { }

export class AuthFindManyResourcesQueryImpl implements AuthFindManyResourcesQuery {
    constructor(
        private readonly repository: AuthResourceRepository,
    ) { }

    async handleAsync(value: AuthFindManyResourcesQueryPayload): Promise<AuthResourceModel[]> {
        const values = await this.repository.findManyAsync({ filter: [{ field: 'authId', operator: 'eq', value: value.authId }] });
        return values;
    }
}