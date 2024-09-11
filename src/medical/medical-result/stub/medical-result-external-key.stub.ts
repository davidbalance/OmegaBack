import { MedicalResultExternalKeyEntity } from "../entities/medical-result-external-key.entity";

const stubMedicalResultExternalKey = (id: number): MedicalResultExternalKeyEntity => ({
    id: 0,
    source: "test-source",
    key: "test-key",
    createAt: new Date(),
    updateAt: new Date()
});

export const mockMedicalResultExternalKey = () => stubMedicalResultExternalKey(1);
export const mockMedicalResultExternalKeys = () => Array(20).map(stubMedicalResultExternalKey);