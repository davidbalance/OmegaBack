import { Inject } from "@nestjs/common";

export const AuthAggregateRepositoryToken = 'AuthAggregateRepository';
export const LogoAggregateRepositoryToken = 'LogoAggregateRepository';
export const ResourceAggregateRepositoryToken = 'LogoAggregateRepository';

const repository = {
    Auth: AuthAggregateRepositoryToken,
    Logo: LogoAggregateRepositoryToken,
    Resource: ResourceAggregateRepositoryToken,
}

export const InjectAggregateRepository = (token: keyof typeof repository) => Inject(repository[token]);