import { CreateBranchExternalRequestDTO } from "@/location/branch/dtos";
import { CreatePatientExternalRequestDTO } from "@/user/common";
import { Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from "class-validator";

export class CreateOrderExternalRequestDTO {
    @IsString()
    @IsNotEmpty()
    public readonly key: string;

    @IsString()
    @IsNotEmpty()
    public readonly process: string;

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateBranchExternalRequestDTO)
    public readonly branch: CreateBranchExternalRequestDTO;

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreatePatientExternalRequestDTO)
    public readonly patient: CreatePatientExternalRequestDTO;
}

export class FindOneOrderExternalAndUpdateRequestDTO {
    @IsString()
    @IsNotEmpty()
    public readonly process: string;
}