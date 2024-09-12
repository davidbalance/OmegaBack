import { IsInt } from "class-validator";
import { MedicalReportRequestDto } from "./medical-report.base.dto";

export class PostMedicalReportRequestDto extends MedicalReportRequestDto {
    @IsInt()
    public readonly medicalResult: number;
}