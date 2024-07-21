import { IsNumber, IsString, IsNotEmpty } from "class-validator";
import { MedicalResultDiseaseRequest, MedicalResultDiseaseResponse } from "./medical-result.dto";

export class POSTMedicalResultDiseaseResponseDto extends MedicalResultDiseaseResponse { }

export class POSTMedicalResultDiseaseRequestDto extends MedicalResultDiseaseRequest {
    @IsNumber()
    public readonly medicalResultId: number;
}