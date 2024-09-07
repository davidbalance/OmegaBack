import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { Expose, Type } from "class-transformer";
import { Exam } from "./exam.base.dto";

export class GetExamArrayResponseDto implements ObjectArrayResponse<Exam> {
    @Expose()
    @Type(() => Exam)
    public data: Exam[];
}