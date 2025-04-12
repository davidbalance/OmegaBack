import { ExternalConnectionKeyRequest } from "@/shared/utils/bases/base.external-connection";
import { IsString, IsNotEmpty, IsDefined, IsNotEmptyObject, IsObject, ValidateNested } from "class-validator";
import { PostCompanyRequestDto } from "./post.company.request.dto";
import { PostCorporativeGroupWithKeyRequestDto } from "@/location/corporative-group/dtos/request/post.corporative-group-with-key.dto";
import { Type } from "class-transformer";

export class PostCompanyWithKeyRequestDto
    extends PostCompanyRequestDto
    implements ExternalConnectionKeyRequest {
    @IsString()
    @IsNotEmpty()
    public readonly key: string;

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => PostCorporativeGroupWithKeyRequestDto)
    public readonly corporativeGroup: PostCorporativeGroupWithKeyRequestDto
}