import { IsNotEmpty, IsString } from "class-validator";
import { ExternalConnectionKeyRequest } from "@/shared/utils/bases/base.external-connection";
import { PostExamSubtypeExternalRequestDto } from "./post.exam-subtype-external.dto";

export class PostExamSubtypeWithKeyRequestDto
    extends PostExamSubtypeExternalRequestDto
    implements ExternalConnectionKeyRequest {
    @IsString()
    @IsNotEmpty()
    public readonly key: string;
}