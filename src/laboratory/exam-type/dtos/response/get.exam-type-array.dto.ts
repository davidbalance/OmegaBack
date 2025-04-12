import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { ExamTypeResponseDto } from "./base.exam-type.dto";
import { Expose, Type } from "class-transformer";

export class GetExamTypeArrayResponseDto implements ObjectArrayResponse<ExamTypeResponseDto> {
    @Expose()
    @Type(() => ExamTypeResponseDto)
    public readonly data: ExamTypeResponseDto[];
}