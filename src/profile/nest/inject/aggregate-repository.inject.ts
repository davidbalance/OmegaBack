import { Inject } from "@nestjs/common";

export const UserAggregateRepositoryToken = 'UserAggregateRepository'
const repository = {
    User: UserAggregateRepositoryToken
}

export const InjectAggregateRepository = (token: keyof typeof repository) => Inject(repository[token]);