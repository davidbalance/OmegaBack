import { PartialType } from "@nestjs/mapped-types";
import { ExamRequestDto } from "./exam.base.dto";

export class PatchExamRequestDto extends PartialType(ExamRequestDto) { }