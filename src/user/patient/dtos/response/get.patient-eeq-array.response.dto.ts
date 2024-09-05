import { Expose, Type } from "class-transformer";
import { PatientEeqResponseDto } from "./base.patient-eeq.response.dto";
import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";

export class GetPatientEeqArrayResponseDto implements ObjectArrayResponse<PatientEeqResponseDto> {
    @Type(() => PatientEeqResponseDto)
    @Expose() public readonly data: PatientEeqResponseDto[];

}