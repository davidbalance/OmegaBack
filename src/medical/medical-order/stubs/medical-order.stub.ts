import { MedicalOrder } from "../dtos/response/medical-order.base.dto";

const stubMedicalOrder = (id: number): MedicalOrder => ({
    id: id,
    process: "Stub process",
    createAt: new Date(),
    orderStatus: "created",
    hasFile: false
});

export const mockMedicalOrder = () => stubMedicalOrder(1);
export const mockMedicalOrders = () => Array(20).map(stubMedicalOrder);