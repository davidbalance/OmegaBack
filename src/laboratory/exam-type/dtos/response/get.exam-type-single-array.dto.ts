import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { Expose, Type } from "class-transformer";
import { ExamTypeSingleResponseDto } from "./base.exam-type-single.dto";

export class GetExamTypeSingleArrayResponseDto implements ObjectArrayResponse<ExamTypeSingleResponseDto> {
    @Expose()
    @Type(() => ExamTypeSingleResponseDto)
    public readonly data: ExamTypeSingleResponseDto[];
}