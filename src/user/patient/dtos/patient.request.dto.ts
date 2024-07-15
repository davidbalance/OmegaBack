import { Transform, Type } from "class-transformer";
import { IsDate, IsDefined, IsEnum, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsOptional, IsString, Length, ValidateNested } from "class-validator";
import { PatientGenderEnum } from "../common/enums/patient.enum";

class PatientRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
    public readonly lastname: string;

    @IsEnum(PatientGenderEnum)
    public readonly gender: PatientGenderEnum;

    @IsDate()
    @Type(() => Date)
    public readonly birthday: Date;
}

export class POSTPatientRequestDto extends PatientRequestDto {

    @IsString()
    @IsNotEmpty()
    @Length(10, 10)
    public readonly dni: string;
}

enum Order {
    DESC = "DESC",
    ASC = "ASC"
}
export class GETPatientOrderedRequestDto {
    @IsString()
    @IsNotEmpty()
    key: string;

    @IsEnum(Order)
    order: Order;
}

export class GETPatientByFilterAndPaginationRequestDto {
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
    @Type(() => GETPatientOrderedRequestDto)
    @IsOptional()
    public readonly order?: GETPatientOrderedRequestDto;
}

export class PATCHPatientRequestDto extends PatientRequestDto { }