import { IsString, IsNotEmpty } from "class-validator";
import { PostExamExternalRequestDto } from "./post.exam-external.request.dto";
import { ExternalConnectionKeyRequest } from "@/shared/utils/bases/base.external-connection";

export class PostExamWithKeyRequestDto
    extends PostExamExternalRequestDto
    implements ExternalConnectionKeyRequest {
    @IsString()
    @IsNotEmpty()
    public readonly key: string;
}