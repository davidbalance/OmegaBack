import { Inject } from "@nestjs/common";

export const AreaAggregateRepositoryToken = 'AreaAggregateRepository'
export const CorporativeAggregateRepositoryToken = 'CorporativeAggregateRepository'
export const JobPositionAggregateRepositoryToken = 'JobPositionAggregateRepository'
export const ManagementAggregateRepositoryToken = 'ManagementAggregateRepository'

const repository = {
    Area: AreaAggregateRepositoryToken,
    Corporative: CorporativeAggregateRepositoryToken,
    JobPosition: JobPositionAggregateRepositoryToken,
    Management: ManagementAggregateRepositoryToken,
}

export const InjectAggregateRepository = (token: keyof typeof repository) => Inject(repository[token]);