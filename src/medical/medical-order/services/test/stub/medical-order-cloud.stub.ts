import { MedicalOrderCloudResponseDto } from "@/medical/medical-order/dtos/response/base.medical-order-cloud.response.dto";

const stubMedicalOrderCloud = (id: number): MedicalOrderCloudResponseDto => ({
    dni: "1234567890",
    fullname: "Test name",
    fileResults: [],
    fileReports: []
});

export const mockMedicalOrderCloud = () => stubMedicalOrderCloud(1);
export const mockMedicalOrderClouds = () => [1, 2, 3, 4, 5].map(stubMedicalOrderCloud);