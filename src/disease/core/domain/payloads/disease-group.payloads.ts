export type CreateDiseaseGroupPayload = {
    name: string;
}

export type AddDiseaseToGroupPayload = {
    diseaseName: string;
}

export type RenameDiseaseFromGroupPayload = {
    diseaseName: string;
    diseaseId: string;
}