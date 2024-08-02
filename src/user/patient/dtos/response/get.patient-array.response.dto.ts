import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { Type, Expose } from "class-transformer";
import { PatientResponseDto } from "./base.patient.response.dto";

export class GetPatientArrayResponseDto implements ObjectArrayResponse<PatientResponseDto> {
    @Type(() => PatientResponseDto)
    @Expose() public readonly data: PatientResponseDto[];
}