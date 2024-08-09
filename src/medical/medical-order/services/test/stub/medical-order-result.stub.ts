import { MedicalOrderResponseDto } from "@/medical/medical-order/dtos/response/base.medical-order.response.dto";

const stubMedicalOrder = (id: number): MedicalOrderResponseDto => ({
    id: id,
    process: "Test process",
    createAt: new Date(),
    orderStatus: "",
    client: undefined,
    results: []
})

export const mockMedicalOrderFlat = () => stubMedicalOrder(1);
export const mockMedicalOrderFlatArray = () => [1, 2, 3, 4, 5].map(stubMedicalOrder);