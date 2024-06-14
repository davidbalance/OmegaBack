import { POSTCompanyRequestDTO } from "@/location/company/dtos/external-key.request.dto";
import { Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from "class-validator";

export class POSTBranchRequestDTO {
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
    @Type(() => POSTCompanyRequestDTO)
    public readonly company: POSTCompanyRequestDTO
}

export class PATCHBranchRequestDTO {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}