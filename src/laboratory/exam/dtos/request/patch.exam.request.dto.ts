import { PostExamSubtypeRequestDto } from "@/laboratory/exam-subtype/dtos/request/post.exam-subtype.dto";
import { OmitType } from "@nestjs/mapped-types";

export class PatchExamRequestDto extends OmitType(PostExamSubtypeRequestDto, ['type']) { }