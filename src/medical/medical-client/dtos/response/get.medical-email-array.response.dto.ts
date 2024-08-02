import { Expose, Type } from "class-transformer";
import { MedicalEmailResponseDto } from "./base.medical-email.response.dto";
import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";

export class GetMedicalEmailArrayResponseDto implements ObjectArrayResponse<MedicalEmailResponseDto> {
    @Type(() => MedicalEmailResponseDto)
    @Expose() public readonly data: MedicalEmailResponseDto[];
}