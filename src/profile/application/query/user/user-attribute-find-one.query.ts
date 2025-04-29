import { UserAttributeModel } from "@omega/profile/core/model/user/user-attribute.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { UserAttributeRepository } from "../../repository/model.repositories";
import { AttributeNotFoundError } from "@omega/profile/core/domain/user/errors/attribute.errors";

export type UserAttributeFindOneQueryPayload = {
    userId: string;
    attributeName: string;
}
export interface UserAttributeFindOneQuery extends QueryHandlerAsync<UserAttributeFindOneQueryPayload, UserAttributeModel> { }

export class UserAttributeFindOneQueryImpl implements UserAttributeFindOneQuery {
    constructor(
        private readonly repository: UserAttributeRepository
    ) { }

    async handleAsync(query: UserAttributeFindOneQueryPayload): Promise<UserAttributeModel> {
        const value = await this.repository.findOneAsync([
            { field: 'userId', operator: 'eq', value: query.userId },
            { field: 'attributeName', operator: 'eq', value: query.attributeName },
        ]);
        if (!value) throw new AttributeNotFoundError(`${query.userId}|${query.attributeName}`);
        return value;
    }
}