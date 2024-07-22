import { IsDefined, IsNotEmptyObject, IsObject, ValidateNested } from "class-validator";
import { PostCompanyRequestDto } from "./post.company.request.dto";
import { PostCorporativeGroupWithKeyRequestDto } from "@/location/corporative-group/dtos/request/post.corporative-group-with-key.dto";
import { Type } from "class-transformer";

export class PostCompanyExternalRequestDto extends PostCompanyRequestDto {

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => PostCorporativeGroupWithKeyRequestDto)
    public readonly corporativeGroup: PostCorporativeGroupWithKeyRequestDto
}