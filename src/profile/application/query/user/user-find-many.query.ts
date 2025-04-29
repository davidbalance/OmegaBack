import { UserModel } from "@omega/profile/core/model/user/user.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { Filter, Order, Pagination } from "@shared/shared/domain";
import { UserRepository } from "../../repository/model.repositories";
import { PaginationResponse } from "@shared/shared/nest/pagination-response";

export type UserFindManyQueryPayload = {
    filter?: string;
} & Required<Pagination> & Order<UserModel>
export interface UserFindManyQuery extends QueryHandlerAsync<UserFindManyQueryPayload, PaginationResponse<UserModel>> { }

export class UserFindManyQueryImpl implements UserFindManyQuery {
    constructor(
        private readonly repository: UserRepository
    ) { }

    async handleAsync(query: UserFindManyQueryPayload): Promise<PaginationResponse<UserModel>> {
        const filter: Filter<UserModel>[] = [];
        if (query.filter) {
            filter.push({ field: 'userDni', operator: 'like', value: query.filter });
            filter.push({ field: 'userName', operator: 'like', value: query.filter });
            filter.push({ field: 'userLastname', operator: 'like', value: query.filter });
        }

        const data = await this.repository.findManyAsync({
            ...query,
            filter: [{
                operator: "or",
                filter: filter
            }]
        });

        const amount = await this.repository.countAsync([{
            operator: "or",
            filter: filter
        }])

        return { data, amount }
    }
}