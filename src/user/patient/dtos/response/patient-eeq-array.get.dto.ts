import { Expose, Type } from "class-transformer";
import { PatientEeq } from "./patient-eeq.base.dto";
import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";

export class GetPatientEeqArrayResponseDto implements ObjectArrayResponse<PatientEeq> {
    @Type(() => PatientEeq)
    @Expose() public readonly data: PatientEeq[];

}