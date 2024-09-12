import { OmitType } from "@nestjs/mapped-types";
import { Expose, Type } from "class-transformer";
import { ExamSubtype } from "./exam-subtype.base.dto";
import { ExtendedExam } from "@/laboratory/exam/dtos/response/extended-exam.base.dto";

export class ExtendedExamSubtype extends OmitType(ExamSubtype, ['type']) {
    @Type(() => ExtendedExam)
    @Expose() public readonly exams: ExtendedExam[];
}