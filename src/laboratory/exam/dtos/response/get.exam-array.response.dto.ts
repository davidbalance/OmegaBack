import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { ExamResponseDto } from "./base.exam.response.dto";
import { Expose, Type } from "class-transformer";

export class GetExamArrayResponseDto implements ObjectArrayResponse<ExamResponseDto> {
    @Expose()
    @Type(() => ExamResponseDto)
    public data: ExamResponseDto[];
}