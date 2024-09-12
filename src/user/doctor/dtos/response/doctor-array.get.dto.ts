import { Type, Expose } from "class-transformer";
import { Doctor } from "./doctor.base.dto";
import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";

export class GetDoctorArrayResponseDto implements ObjectArrayResponse<Doctor> {
    @Type(() => Doctor)
    @Expose() public readonly data: Doctor[];
}