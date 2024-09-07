import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { ExamType } from "./exam-type.base.dto";
import { Expose, Type } from "class-transformer";

export class GetExamTypeArrayResponseDto implements ObjectArrayResponse<ExamType> {
    @Expose()
    @Type(() => ExamType)
    public readonly data: ExamType[];
}