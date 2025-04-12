import { ExamResponseDto } from "@/laboratory/exam/dtos/response/base.exam.response.dto";
import { Expose, Type } from "class-transformer";

export class ExamSubtypeResponseDto {
    @Expose() public readonly id: number;
    @Expose() public readonly name: string;

    @Type(() => ExamResponseDto)
    @Expose() public readonly exams: ExamResponseDto[];
}