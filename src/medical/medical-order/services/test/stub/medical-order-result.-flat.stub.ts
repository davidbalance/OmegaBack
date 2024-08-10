import { MedicalOrderFlatResponseDto } from "@/medical/medical-order/dtos/response/base.medical-order-flat.response.dto";

const stubMedicalOrderFlat = (id: number): MedicalOrderFlatResponseDto => ({
    id: id,
    fullname: "Test name",
    orderStatus: "validated",
    companyRuc: "1234567890001",
    companyName: "Company",
    process: "Test process",
    results: [],
    dni: "1234567890",
    email: []
})

export const mockMedicalOrderFlat = () => stubMedicalOrderFlat(1);
export const mockMedicalOrderFlatArray = () => [1, 2, 3, 4, 5].map(stubMedicalOrderFlat);