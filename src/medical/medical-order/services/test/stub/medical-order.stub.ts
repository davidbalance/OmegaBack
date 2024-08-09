import { MedicalOrder } from "@/medical/medical-order/entities/medical-order.entity";
import { OrderStatus } from "@/medical/medical-order/enums";

const stubMedicalOrder = (id: number): MedicalOrder => ({
    id: 1,
    corporativeName: "Test corporative name",
    companyRuc: "1234567890001",
    companyName: "Test company name",
    branchName: "Test branch name",
    process: "Test process",
    mailStatus: false,
    orderStatus: OrderStatus.CREATED,
    results: [],
    externalKey: undefined,
    client: undefined,
    createAt: new Date(),
    updateAt: new Date()
});

export const mockMedicalOrder = () => stubMedicalOrder(1);
export const mockMedicalOrders = () => [1, 2, 3, 4, 5].map(stubMedicalOrder);