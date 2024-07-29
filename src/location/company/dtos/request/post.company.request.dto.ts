import { PostCorporativeGroupRequestDto } from "@/location/corporative-group/dtos/request/post.corporative-group.dto";
import { Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from "class-validator";

export class PostCompanyRequestDto {

    @IsString()
    @IsNotEmpty()
    public readonly ruc: string;

    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
    public readonly address: string;

    @IsString()
    @IsNotEmpty()
    public readonly phone: string;

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => PostCorporativeGroupRequestDto)
    public readonly corporativeGroup: PostCorporativeGroupRequestDto
}