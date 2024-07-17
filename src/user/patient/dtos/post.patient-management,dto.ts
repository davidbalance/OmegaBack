import { IsString, IsNotEmpty, Length } from "class-validator";
import { GETPatientResponseDto } from "./get.patient-managment,dto";
import { PatientRequestDto } from "./patient.dto";

export class POSTPatientResponseDto extends GETPatientResponseDto { }


export class POSTPatientRequestDto extends PatientRequestDto {
    @IsString()
    @IsNotEmpty()
    @Length(10, 10)
    public readonly dni: string;
}