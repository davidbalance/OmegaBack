import { Expose, Type } from "class-transformer";
import { PatientResponseDto } from "./patient.dto";

export class GETPatientResponseDto extends PatientResponseDto { }

export class GETPatientArrayResponseDto {
    @Type(() => GETPatientResponseDto)
    @Expose()
    public readonly patients: GETPatientResponseDto[];
}