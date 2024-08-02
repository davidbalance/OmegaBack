import { Type } from "class-transformer";
import { IsDefined, IsNotEmptyObject, IsObject, ValidateNested } from "class-validator";
import { PostBranchRequestDto } from "./post.branch.request.dto";
import { PostCompanyWithKeyRequestDto } from "@/location/company/dtos/request/post.company-with-key.request.dto";

export class PostBranchExternalRequestDto extends PostBranchRequestDto {

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => PostCompanyWithKeyRequestDto)
    public readonly company: PostCompanyWithKeyRequestDto
}