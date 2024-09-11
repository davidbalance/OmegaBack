import { MedicalClientEntity } from "@/medical/medical-client/entities/medical-client.entity";
import { MedicalOrderExternalKeyEntity } from "../entities/medical-order-external-key.entity";
import { MedicalOrderEntity } from "../entities/medical-order.entity";
import { OrderStatus } from "../enums";

const stubMedicalOrderExternalKey = (id: number): MedicalOrderExternalKeyEntity => ({
    id: id,
    source: "Stub source",
    key: "Stub key",
    createAt: new Date(),
    updateAt: new Date(),
});

export const mockMedicalOrderExternalKey = () => stubMedicalOrderExternalKey(1);
export const mockMedicalOrderExternalKeys = () => Array(20).map(stubMedicalOrderExternalKey);