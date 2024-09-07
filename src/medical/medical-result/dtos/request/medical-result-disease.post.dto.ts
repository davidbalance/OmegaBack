import { IsInt } from "class-validator";
import { MedicalResultDiseaseRequestDto } from "./medical-result-disease.base.dto";

export class PostMedicalResultDiseaseRequestDto extends MedicalResultDiseaseRequestDto {
    @IsInt()
    public readonly medicalResultId: number;
}