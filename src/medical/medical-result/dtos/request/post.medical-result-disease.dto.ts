import { IsNumber } from "class-validator";
import { MedicalResultDiseaseRequestDto } from "./base.medical-result-disease.request.dto";

export class PostMedicalResultDiseaseRequestDto extends MedicalResultDiseaseRequestDto {
    @IsNumber()
    public readonly medicalResultId: number;
}