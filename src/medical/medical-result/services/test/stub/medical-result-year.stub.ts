import { MedicalResultYearResponseDto } from "@/medical/medical-result/dtos/response/base.medical-result-year.response.dto";

const stubYear = (year: number): MedicalResultYearResponseDto => ({
    year: year
});

export const mockMedicalResultYearResponseDtoArray = () => [2022, 2023, 2024].map(stubYear);