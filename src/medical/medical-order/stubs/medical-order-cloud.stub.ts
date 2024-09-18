import { MedicalOrderCloud } from "../dtos/response/medical-order-cloud.base.dto";

const stubMedicalOrderCloud = (): MedicalOrderCloud => ({
    dni: "1234567890",
    fullname: "Stub fullname",
    fileResults: [{
        id: 1,
        examName: "Test exam",
        type: "result",
        hasFile: false
    }],
    fileReports: [{
        id: 1,
        examName: "Test exam",
        type: "report",
        hasFile: false
    }]
});

export const mockMedicalOrderCloud = () => stubMedicalOrderCloud();
export const mockMedicalOrderClouds = () => Array(20).map(stubMedicalOrderCloud);