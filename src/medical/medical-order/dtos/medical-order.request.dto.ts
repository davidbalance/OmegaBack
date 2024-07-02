
import { POSTBranchRequestDto } from "@/location/branch/dtos/branch.request.dto";
import { POSTPatientRequestDto } from "@/user/patient/dtos/patient.request.dto";
import { Type } from "class-transformer";
import { IsDefined, IsEmail, IsNotEmptyObject, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";

export class POSTPatientWithEmailRequestDto extends POSTPatientRequestDto {
    @IsEmail()
    public readonly email: string;
}

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
    @Type(() => POSTPatientWithEmailRequestDto)
    public readonly patient: POSTPatientWithEmailRequestDto;

    @IsString()
    public readonly process: string;
}

export class POSTMailRequestDto {
    @IsNumber()
    public readonly order: number;
    @IsNumber()
    public readonly mail: number;
}