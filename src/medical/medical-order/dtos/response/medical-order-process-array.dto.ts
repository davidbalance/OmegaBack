import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { Expose } from "class-transformer";

export class GetMedicalOrderProcessArrayDto implements ObjectArrayResponse<string> {
    @Expose() public readonly data: string[];
}