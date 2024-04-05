import { CreateCompanyExternalRequestDTO } from "@/location/company/dtos/company-external-key.request.dto";
import { Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from "class-validator";

export class CreateBranchExternalRequestDTO {
    @IsString()
    @IsNotEmpty()
    public readonly key: string;

    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateCompanyExternalRequestDTO)
    public readonly company: CreateCompanyExternalRequestDTO
}

export class FindOneBranchExternalAndUpdateRequestDTO {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}