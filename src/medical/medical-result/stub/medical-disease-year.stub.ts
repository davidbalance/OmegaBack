import { MedicalResultYear } from "../dtos/response/medical-result-year.base.dto";

const stubMedicalDiseaseYear = (id: number): MedicalResultYear => ({
    year: id
});

export const mockMedicalDiseaseYear = () => stubMedicalDiseaseYear(1);
export const mockMedicalDiseaseYears = () => Array(10).map(stubMedicalDiseaseYear);