import { Expose, Type } from "class-transformer";
import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { MedicalClient } from "./medical-client.base.dto";

export class GetMedicalClientArrayResponseDto implements ObjectArrayResponse<MedicalClient> {
    @Type(() => MedicalClient)
    @Expose() public readonly data: MedicalClient[];
}