import { PatientRequestDto } from "@/user/patient/dtos/request/base.patient.request.dto";
import { IsEmail, IsOptional } from "class-validator";

export class MedicalClientRequestDto extends PatientRequestDto {
    @IsEmail()
    @IsOptional()
    public readonly email: string;
}