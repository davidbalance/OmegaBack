import { MedicalResultDisease } from "../dtos/response/medical-result.-disease.base.dto";

const stubMedicalDisease = (id: number): MedicalResultDisease => ({
    id: id,
    diseaseId: 1,
    diseaseName: "Stub disease",
    diseaseCommentary: "Stub commentary",
    diseaseGroupId: 1,
    diseaseGroupName: "Stub group"
});

export const mockMedicalDisease = () => stubMedicalDisease(1);
export const mockMedicalDiseases = () => Array(20).map(stubMedicalDisease);