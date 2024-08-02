import { Expose } from "class-transformer";
import { PatientResponseDto } from "./base.patient.response.dto";

export class PatientEeqResponseDto extends PatientResponseDto {
    @Expose() public readonly role: string;
}