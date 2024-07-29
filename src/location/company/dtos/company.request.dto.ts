import { POSTCorporativeGroupRequestDto } from "@/location/corporative-group/dtos/post.corporative-group.dto";
import { ExternalConnectionRequest } from "@/shared/utils/bases/base.external-connection";
import { Type } from "class-transformer";
import { IsDefined, IsEmpty, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from "class-validator";

export class POSTCompanyRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly key: string;

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
    @Type(() => POSTCorporativeGroupRequestDto)
    public readonly corporativeGroup: POSTCorporativeGroupRequestDto
}

export class PATCHCompanyRequestDto {

    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
    public readonly address: string;

    @IsString()
    @IsNotEmpty()
    public readonly phone: string;
}


export class POSTCompanyRequestExternalConnectionDto
    extends POSTCompanyRequestDto
    implements ExternalConnectionRequest {
    @IsString()
    @IsEmpty()
    public readonly source: string;
}