
import { POSTBranchRequestDto } from "@/location/branch/dtos/branch.request.dto";
import { POSTPatientRequestDto } from "@/user/patient/dtos/patient.request.dto";
import { Transform, Type } from "class-transformer";
import { IsDefined, IsEmail, IsEnum, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

export class POSTPatientWithEmailRequestDto extends POSTPatientRequestDto {
    @IsEmail()
    public readonly email: string;
}

enum Order {
    DESC = "DESC",
    ASC = "ASC"
}
export class GETMedicalOrderOrderedRequestDto {
    @IsString()
    @IsNotEmpty()
    key: string;

    @IsEnum(Order)
    order: Order;
}

export class GETMedicalOrderByFilterAndPaginationRequestDto {
    @IsNumber()
    public readonly page: number;

    @IsNumber()
    @IsOptional()
    public readonly limit?: number;

    @IsString()
    @IsOptional()
    public readonly filter?: string | undefined;

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Transform(({ value }) => value)
    @Type(() => GETMedicalOrderOrderedRequestDto)
    @IsOptional()
    public readonly order?: GETMedicalOrderOrderedRequestDto;
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