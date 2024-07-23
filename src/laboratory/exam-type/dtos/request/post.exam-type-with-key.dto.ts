import { IsNotEmpty, IsString } from "class-validator";
import { PostExamTypeRequestDto } from "./post.exam-type.dto";
import { ExternalConnectionKeyRequest } from "@/shared/utils/bases/base.external-connection";

export class PostExamTypeWithKeyRequestDto
    extends PostExamTypeRequestDto
    implements ExternalConnectionKeyRequest {

    @IsString()
    @IsNotEmpty()
    public readonly key: string;
}