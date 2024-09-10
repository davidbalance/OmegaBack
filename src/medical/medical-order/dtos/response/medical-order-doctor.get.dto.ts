import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { MedicalOrderDoctor } from "./medical-order-doctor.base.dto";
import { Type, Expose } from "class-transformer";

export class GetMedicalOrderDoctorArrayResponseDto implements ObjectArrayResponse<MedicalOrderDoctor> {
    @Type(() => MedicalOrderDoctor)
    @Expose() public readonly data: MedicalOrderDoctor[];
}