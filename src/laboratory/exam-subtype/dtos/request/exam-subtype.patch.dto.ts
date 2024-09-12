import { PartialType } from "@nestjs/mapped-types";
import { ExamSubtypeRequestDto } from "./exam-subtype.base.dto";

export class PatchExamSubtypeRequestDto extends PartialType(ExamSubtypeRequestDto) { }