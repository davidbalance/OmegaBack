import { MedicalResultDiseaseEntity } from "../entities/medical-result-disease.entity";

const stubMedicalDiseaseEntity = (id: number): MedicalResultDiseaseEntity => ({
    id: id,
    diseaseId: 1,
    diseaseName: "Stub disease",
    diseaseCommentary: "Stub commentary",
    diseaseGroupId: 1,
    diseaseGroupName: "Stub group",
    result: { id: 1 } as any,
    createAt: new Date(),
    updateAt: new Date()
});

export const mockMedicalDiseaseEntity = () => stubMedicalDiseaseEntity(1);
export const mockMedicalDiseaseEntities = () => Array(20).map(stubMedicalDiseaseEntity);