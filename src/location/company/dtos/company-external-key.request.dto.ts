import { CreateCorporativeGroupExternalRequestDTO } from "@/location/corporative-group/dtos/c-g-external-connection.request.dto";
import { Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from "class-validator";

export class CreateCompanyExternalRequestDTO {
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
    @Type(() => CreateCorporativeGroupExternalRequestDTO)
    public readonly corporativeGroup: CreateCorporativeGroupExternalRequestDTO
}

export class FindCompanyExternalAndUpdateRequestDTO {

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
}