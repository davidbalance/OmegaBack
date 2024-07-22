import { Expose, Type } from "class-transformer";
import { ManagementResponseDto } from "./management.dto";
import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";

export class GETManagementResponseDto extends ManagementResponseDto { }

export class GETManagementArrayResponseDto implements ObjectArrayResponse<ManagementResponseDto> {
    @Expose()
    @Type(() => ManagementResponseDto)
    public readonly data: ManagementResponseDto[];
}