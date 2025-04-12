import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { ManagementResponseDto } from "./base.management.response.dto";
import { Expose, Type } from "class-transformer";

export class GetManagementArrayResponseDto implements ObjectArrayResponse<ManagementResponseDto> {
    @Expose()
    @Type(() => ManagementResponseDto)
    public readonly data: ManagementResponseDto[];
}