import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { Management } from "./management.base.dto";
import { Expose, Type } from "class-transformer";

export class GetManagementArrayResponseDto implements ObjectArrayResponse<Management> {
    @Expose()
    @Type(() => Management)
    public readonly data: Management[];
}