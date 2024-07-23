import { IsNotEmpty, IsString } from "class-validator";
import { PostExamSubtypeRequestDto } from "./post.exam-subtype.dto";
import { ExternalConnectionKeyRequest } from "@/shared/utils/bases/base.external-connection";
import { OmitType } from "@nestjs/mapped-types";

export class PostExamSubtypeWithKeyRequestDto
    extends OmitType(PostExamSubtypeRequestDto, ['type'])
    implements ExternalConnectionKeyRequest {
    @IsString()
    @IsNotEmpty()
    public readonly key: string;
}