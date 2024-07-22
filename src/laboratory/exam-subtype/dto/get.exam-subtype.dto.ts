import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { ExamSubtypeResponse } from "./exam-subtype.dto";
import { Expose, Type } from "class-transformer";

export class GETExamSubtypeResponseDto extends ExamSubtypeResponse { }

export class GETExamSubtypeArrayResponseDto implements ObjectArrayResponse<GETExamSubtypeResponseDto> {
    @Expose()
    @Type(() => GETExamSubtypeResponseDto)
    public readonly data: GETExamSubtypeResponseDto[];
 }