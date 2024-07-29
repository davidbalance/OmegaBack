import { ExternalConnectionKeyRequest } from "@/shared/utils/bases/base.external-connection";
import { IsString, IsNotEmpty } from "class-validator";
import { PostCorporativeGroupRequestDto } from "./post.corporative-group.dto";

export class PostCorporativeGroupWithKeyRequestDto
    extends PostCorporativeGroupRequestDto
    implements ExternalConnectionKeyRequest {
    @IsString()
    @IsNotEmpty()
    public readonly key: string;
}