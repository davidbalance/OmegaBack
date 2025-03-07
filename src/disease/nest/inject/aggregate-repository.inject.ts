import { Inject } from "@nestjs/common";

export const DiseaseGroupAggregateRepositoryToken = 'DiseaseGroupAggregateRepository';

const repository = {
    DiseaseGroup: DiseaseGroupAggregateRepositoryToken
}

export const InjectAggregateRepository = (token: keyof typeof repository) => Inject(repository[token]);