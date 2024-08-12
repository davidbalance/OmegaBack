import { MedicalOrderExternalKey } from "@/medical/medical-order/entities/medical-order-external-key.entity";

const stubMedicalOrderExternalKey = (id: number): MedicalOrderExternalKey => ({
    id: id,
    source: "Mocked source",
    key: "Mocked key",
    createAt: new Date(),
    updateAt: new Date()
});

export const mockMedicalOrderExternalKey = () => stubMedicalOrderExternalKey(1);
export const mockMedicalOrderExternalKeys = () => [1, 2, 3, 4, 5].map(stubMedicalOrderExternalKey);