import { MedicalReport } from "../dtos/response/medical-report.base.dto";

const stubMedicalReport = (id: number): MedicalReport => ({
    id: id,
    content: "Stub content",
    hasFile: false
});

export const mockMedicalReport = () => stubMedicalReport(1);
export const mockMedicalReports = () => Array(10).map(stubMedicalReport);