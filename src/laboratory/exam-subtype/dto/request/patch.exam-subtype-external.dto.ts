import { OmitType } from "@nestjs/mapped-types";
import { PostExamSubtypeRequestDto } from "./post.exam-subtype.dto";

export class PatchExamSubtypeExternalRequestDto extends OmitType(PostExamSubtypeRequestDto, ['type']) { }