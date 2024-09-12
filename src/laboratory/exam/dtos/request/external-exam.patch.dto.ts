import { OmitType } from "@nestjs/mapped-types";
import { ExamExternalRequestDto } from "./external-exam.base.dto";

export class PatchExamExternalRequestDto extends OmitType(ExamExternalRequestDto, ['subtype', 'type']) { }