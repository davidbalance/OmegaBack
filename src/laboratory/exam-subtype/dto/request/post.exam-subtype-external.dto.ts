import { OmitType } from "@nestjs/mapped-types";
import { PostExamSubtypeRequestDto } from "./post.exam-subtype.dto";

export class PostExamSubtypeExternalRequestDto extends OmitType(PostExamSubtypeRequestDto, ['type']) { }