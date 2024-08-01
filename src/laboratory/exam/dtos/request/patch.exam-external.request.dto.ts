import { OmitType } from "@nestjs/mapped-types";
import { ExamRequestDto } from "./base.request.dto";

export class PatchExamExternalRequestDto extends OmitType(ExamRequestDto, ['subtype']) { }