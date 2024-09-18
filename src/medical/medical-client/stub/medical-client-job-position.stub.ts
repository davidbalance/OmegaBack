import { MedicalClientJobPosition } from "../dtos/response/medical-client-job-position.base.dto";

const stubMedicalClientJobPosition = (): MedicalClientJobPosition => ({
    jobPositionName: "Stub name"
});

export const mockMedicalClientJobPosition = () => stubMedicalClientJobPosition();
export const mockMedicalClientJobPositions = () => Array(10).map(stubMedicalClientJobPosition);