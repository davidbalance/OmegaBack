import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { Expose, Type } from "class-transformer";
import { ExamSubtype } from "./exam-subtype.base.dto";

export class GetExamSubtypeArrayResponseDto implements ObjectArrayResponse<ExamSubtype> {
    @Type(() => ExamSubtype)
    @Expose() public readonly data: ExamSubtype[];
}