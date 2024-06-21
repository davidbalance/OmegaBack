
import { POSTBranchRequestDto } from "@/location/branch/dtos/branch.request.dto";
import { POSTPatientRequestDto } from "@/user/patient/dtos/patient.request.dto";
import { Type } from "class-transformer";
import { IsDefined, IsNotEmptyObject, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";

export class POSTMedicalOrderRequestDto {

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => POSTBranchRequestDto)
    public readonly branch: POSTBranchRequestDto;

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => POSTPatientRequestDto)
    public readonly patient: POSTPatientRequestDto;

    @IsString()
    public readonly process: string;
}

export class POSTMailRequestDto {
    @IsNumber()
    public readonly order: number;
    @IsNumber()
    public readonly mail: number;
}