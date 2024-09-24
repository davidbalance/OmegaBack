import { MedicalOrderExternalKeyEntity } from "../entities/medical-order-external-key.entity";

const stubMedicalOrderExternalKey = (id: number): MedicalOrderExternalKeyEntity => ({
    id: id,
    source: "Stub source",
    key: "Stub key",
    createAt: new Date(),
    updateAt: new Date(),
});

export const mockMedicalOrderExternalKey = () => stubMedicalOrderExternalKey(1);
export const mockMedicalOrderExternalKeys = () => Array(20).map(stubMedicalOrderExternalKey);