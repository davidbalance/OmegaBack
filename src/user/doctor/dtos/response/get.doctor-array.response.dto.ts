import { Type, Expose } from "class-transformer";
import { DoctorResponseDto } from "./base.doctor.response.dto";
import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";

export class GetDoctorArrayResponseDto implements ObjectArrayResponse<DoctorResponseDto> {
    @Type(() => DoctorResponseDto)
    @Expose() public readonly data: DoctorResponseDto[];
}