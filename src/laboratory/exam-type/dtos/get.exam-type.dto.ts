import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { ExamTypeResponse } from "./exam-type.dto";
import { Expose, Type } from "class-transformer";

export class GETExamTypeResponseDto extends ExamTypeResponse { }

export class GETExamTypeArrayResponseDto implements ObjectArrayResponse<GETExamTypeResponseDto> {
    @Expose()
    @Type(() => GETExamTypeResponseDto)
    public readonly data: GETExamTypeResponseDto[];
}