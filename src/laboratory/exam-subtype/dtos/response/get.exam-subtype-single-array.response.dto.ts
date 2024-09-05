import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { Expose, Type } from "class-transformer";
import { ExamSubtypeSingleResponseDto } from "./base.exam-subtype-single.response.dto";

export class GetExamSubtypeSngleArrayResponseDto implements ObjectArrayResponse<ExamSubtypeSingleResponseDto> {
    @Type(() => ExamSubtypeSingleResponseDto)
    @Expose() public readonly data: ExamSubtypeSingleResponseDto[];
}