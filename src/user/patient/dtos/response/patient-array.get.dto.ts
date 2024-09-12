import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { Type, Expose } from "class-transformer";
import { Patient } from "./patient.base.dto";

export class GetPatientArrayResponseDto implements ObjectArrayResponse<Patient> {
    @Type(() => Patient)
    @Expose() public readonly data: Patient[];
}