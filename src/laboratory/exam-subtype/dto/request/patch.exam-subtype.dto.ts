import { OmitType, PartialType } from "@nestjs/mapped-types";
import { PostExamSubtypeRequestDto } from "./post.exam-subtype.dto";

export class PatchExamSubtypeRequestDto extends PartialType(PostExamSubtypeRequestDto) { }