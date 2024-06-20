import { POSTCorporativeGroupRequestDto } from "@/location/corporative-group/dtos/corporative-group.request.dto";
import { Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from "class-validator";

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