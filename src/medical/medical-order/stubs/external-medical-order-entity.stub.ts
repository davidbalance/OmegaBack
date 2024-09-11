import { ExternalMedicalOrder } from "../dtos/response/external-medical-order.base.dto";
import { ExternalMedicalResult } from "@/medical/medical-result/dtos/response/external-medical-result.base.dto";

const stubMedicalResult = (id: number):  ExternalMedicalResult => ({
    id: id,
    examType: "Test type",
    examSubtype: "Test subtype",
    examName: "Test exam",
    hasFile: false
});

const stubExternalMedicalOrder = (id: number): ExternalMedicalOrder => ({
    id: id,
    results: Array(20).map(stubMedicalResult),
    process: "Stub process",
    createAt: new Date(),
    orderStatus: "created"
});

export const mockExternalMedicalOrder = () => stubExternalMedicalOrder(1);
export const mockExternalMedicalOrders = () => Array(20).map(stubExternalMedicalOrder);