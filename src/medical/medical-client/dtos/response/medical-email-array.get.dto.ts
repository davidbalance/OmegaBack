import { Expose, Type } from "class-transformer";
import { MedicalEmail } from "./medical-email.base.dto";
import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";

export class GetMedicalEmailArrayResponseDto implements ObjectArrayResponse<MedicalEmail> {
    @Type(() => MedicalEmail)
    @Expose() public readonly data: MedicalEmail[];
}