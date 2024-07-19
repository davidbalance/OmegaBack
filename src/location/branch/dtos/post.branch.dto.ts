import { POSTCompanyRequestDto } from "@/location/company/dtos/company.request.dto";
import { Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from "class-validator";
import { BranchResponseDto } from "./branch.dto";
import { ExternalConnectionRequest } from "@/shared/utils/bases/base.external-connection";

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

export class POSTBranchExternalConnectionRequestDto 
extends POSTBranchRequestDto
implements ExternalConnectionRequest {
    @IsString()
    @IsNotEmpty()
    public readonly source: string;
}

export class POSTBranchResponseDto extends BranchResponseDto { }