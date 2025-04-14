export type CreateDiseasePayload = {
    testId: string;
    diseaseId: string;
    diseaseName: string;
    diseaseGroupId: string;
    diseaseGroupName: string;
    commentary: string;
}

export type UpdateDiseasePayload = Partial<Omit<CreateDiseasePayload, 'testId'>>;