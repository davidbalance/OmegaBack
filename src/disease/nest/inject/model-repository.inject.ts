import { Inject } from "@nestjs/common";

export const DiseaseGroupOptionModelRepositoryToken = 'DiseaseGroupOptionModelRepository';
export const DiseaseGroupModelRepositoryToken = 'DiseaseGroupModelRepository';
export const DiseaseModelRepositoryToken = 'DiseaseModelRepository';

const repository = {
    DiseaseGroupOption: DiseaseGroupOptionModelRepositoryToken,
    DiseaseGroup: DiseaseGroupModelRepositoryToken,
    Disease: DiseaseModelRepositoryToken,
}

export const InjectModelRepository = (token: keyof typeof repository) => Inject(repository[token]);