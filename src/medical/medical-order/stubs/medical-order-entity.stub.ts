import { MedicalClientEntity } from "@/medical/medical-client/entities/medical-client.entity";
import { MedicalOrderExternalKeyEntity } from "../entities/medical-order-external-key.entity";
import { MedicalOrderEntity } from "../entities/medical-order.entity";
import { OrderStatus } from "../enums";

const stubMedicalOrderEntity = (id: number): MedicalOrderEntity => ({
    id: id,
    corporativeName: "Test corporative group",
    companyRuc: "1234567890",
    companyName: "Test company",
    branchName: "Test branch",
    process: "Test process",
    mailStatus: false,
    orderStatus: OrderStatus.CREATED,
    results: [],
    externalKey: {} as MedicalOrderExternalKeyEntity,
    client: { id: 1, email: [{ id: 1 }] } as MedicalClientEntity,
    createAt: new Date(),
    updateAt: new Date(),
    hasFile: false
});

export const mockMedicalOrderEntity = () => stubMedicalOrderEntity(1);
export const mockMedicalOrderEntities = () => Array(20).map(stubMedicalOrderEntity);