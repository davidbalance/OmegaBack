import { ExapandedMedicalOrder } from "../dtos/response/expanded-medical-order.base.dto";

const stubExpandedMedicalOrder = (id: number): ExapandedMedicalOrder => ({
    id: id,
    name: "Stub name",
    lastname: "Stub lastname",
    dni: "1234567890",
    orderStatus: "created",
    companyRuc: "1234567890001",
    companyName: "Stub company",
    process: "Stub process",
    createAt: new Date(),
    hasFile: false
});

export const mockExpandedMedicalOrder = () => stubExpandedMedicalOrder(1);
export const mockExpandedMedicalOrders = () => Array(20).map(stubExpandedMedicalOrder);