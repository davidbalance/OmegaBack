import { MedicalReportResponseDto } from "@/medical/medical-report/dtos/response/base.medical-report.response.dto";
import { Expose, Type } from "class-transformer";
import { MedicalResultDiseaseResponse } from "./base.medical-result.-disease.response.dto";

export class MedicalResultResponseDto {
    @Expose() public readonly id: number;
    @Expose() public readonly examName: string;
    @Expose() public readonly hasFile: boolean;

    @Type(() => MedicalResultDiseaseResponse)
    @Expose() public diseases: MedicalResultDiseaseResponse[]

    @Type(() => MedicalReportResponseDto)
    @Expose() public readonly report?: MedicalReportResponseDto
}