import { MedicalResult } from "../dtos/response/medical-result.base.dto";

const stubMedicalResult = (id: number): MedicalResult => ({
    id: id,
    hasFile: false,
    examType: "Stub type",
    examSubtype: "Stub subtype",
    examName: "Stub exam",
    diseases: [],
    reportId: 0,
    reportHasFile: false
});

export const mockMedicalResult = () => stubMedicalResult(1);
export const mockMedicalResults = () => Array(20).map(stubMedicalResult);