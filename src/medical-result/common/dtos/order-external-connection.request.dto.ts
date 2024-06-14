import { POSTBranchRequestDTO } from "@/location/branch/dtos/external-connection.request.dto";
import { CreatePatientExternalRequestDTO } from "@/user/common";
import { Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from "class-validator";

export class POSTMedicalOrderRequestDTO {
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
    @Type(() => POSTBranchRequestDTO)
    public readonly branch: POSTBranchRequestDTO;

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreatePatientExternalRequestDTO)
    public readonly patient: CreatePatientExternalRequestDTO;
}

export class PATCHMedicalOrderRequestDTO {
    @IsString()
    @IsNotEmpty()
    public readonly process: string;
}