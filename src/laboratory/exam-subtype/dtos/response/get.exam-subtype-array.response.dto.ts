import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { ExamSubtypeResponseDto } from "./base.exam-subtype.response.dto";
import { Expose, Type } from "class-transformer";

export class GetExamSubtypeArrayResponseDto implements ObjectArrayResponse<ExamSubtypeResponseDto> {
    @Type(() => ExamSubtypeResponseDto)
    @Expose() public readonly data: ExamSubtypeResponseDto[];
}