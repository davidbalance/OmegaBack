import { ExamSubtypeResponseDto } from "@/laboratory/exam-subtype/dto/response/base.exam-subtype.response.dto";
import { ExamSubtype } from "@/laboratory/exam-subtype/entities/exam-subtype.entity";
import { Expose, Type } from "class-transformer";

export class ExamTypeResponseDto {
    @Expose() public readonly id: number;
    @Expose() public readonly name: string;

    @Type(() => ExamSubtypeResponseDto)
    @Expose() public readonly subtypes: ExamSubtypeResponseDto[];
}