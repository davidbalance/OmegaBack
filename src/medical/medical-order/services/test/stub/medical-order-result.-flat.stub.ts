import { MedicalOrderFlatResponseDto } from "@/medical/medical-order/dtos/response/base.medical-order-flat.response.dto";

const stubMedicalOrderFlat = (id: number): MedicalOrderFlatResponseDto => ({
    id: id,
    lastname: 'sample',
    name: 'sample',
    orderStatus: "validated",
    companyRuc: "1234567890001",
    companyName: "Company",
    process: "Test process",
    dni: "1234567890",
    createAt: new Date(),
    mailStatus: false,
})

export const mockMedicalOrderFlat = () => stubMedicalOrderFlat(1);
export const mockMedicalOrderFlatArray = () => [1, 2, 3, 4, 5].map(stubMedicalOrderFlat);