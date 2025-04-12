import { PartialType } from "@nestjs/mapped-types";
import { ExamRequestDto } from "./base.request.dto";

export class PatchExamRequestDto extends PartialType(ExamRequestDto) { }