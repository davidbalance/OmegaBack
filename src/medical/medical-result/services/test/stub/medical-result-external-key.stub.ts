import { MedicalResultExternalKey } from "@/medical/medical-result/entities/medical-result-external-key.entity";

const stubExternalKey = (id: number): MedicalResultExternalKey => ({
    id: id,
    source: "mocked source",
    key: "mocked key",
    createAt: new Date(),
    updateAt: new Date()
});

export const mockMedicalResultExternalKey = () => stubExternalKey(1);
export const mockMedicalResultExternalKeyArray = () => [1, 2, 3, 4, 5].map(stubExternalKey);