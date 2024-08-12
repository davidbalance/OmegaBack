import { MedicalResultDisease } from "@/medical/medical-result/entities/medical-result-disease.entity";

const stubMedicalResultDisease = (id: number): MedicalResultDisease => ({
    id: id,
    result: undefined,
    createAt: new Date(),
    updateAt: new Date()
});

export const mockMedicalResultDisease = () => stubMedicalResultDisease(1);
export const mockMedicalResultDiseaseArray = () => [1, 2, 3, 4, 5].map(stubMedicalResultDisease);