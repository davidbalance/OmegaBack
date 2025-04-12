import { IsNotEmpty, IsString } from "class-validator";
import { PostBranchExternalRequestDto } from "./post.branch-external.request.dto";
import { ExternalConnectionKeyRequest } from "@/shared/utils/bases/base.external-connection";

export class PostBranchWithKeyRequestDto
    extends PostBranchExternalRequestDto
    implements ExternalConnectionKeyRequest {

    @IsString()
    @IsNotEmpty()
    public readonly key: string;
}