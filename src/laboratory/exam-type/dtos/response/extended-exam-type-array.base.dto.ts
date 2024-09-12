import { Expose, Type } from "class-transformer";
import { ExtendedExamType } from "./extended-exam-type.base.dto";
import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";

export class GetExtendedExamTypeArrayResponseDto implements ObjectArrayResponse<ExtendedExamType> {
    @Expose()
    @Type(() => ExtendedExamType)
    public readonly data: ExtendedExamType[];
}