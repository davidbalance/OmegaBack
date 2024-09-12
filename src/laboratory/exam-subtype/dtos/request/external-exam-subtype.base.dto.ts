import { OmitType } from "@nestjs/mapped-types";
import { PostExamSubtypeRequestDto } from "./exam-subtype.post.dto";

export class ExamSubtypeExternalRequestDto extends OmitType(PostExamSubtypeRequestDto, ['type']) { }