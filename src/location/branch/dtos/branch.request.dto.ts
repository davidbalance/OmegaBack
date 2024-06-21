import { POSTCompanyRequestDto } from "@/location/company/dtos/company.request.dto";
import { Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from "class-validator";

export class POSTBranchRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly key: string;

    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
    public readonly city: string;

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => POSTCompanyRequestDto)
    public readonly company: POSTCompanyRequestDto
}

export class PATCHBranchRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}