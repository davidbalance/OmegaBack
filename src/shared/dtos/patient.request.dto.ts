import { IsDate, IsEmail, IsEnum, IsNumber, IsOptional, IsString, IsStrongPassword, Max } from "class-validator";
import { PatientGenderEnum } from "../enums";
import { Type } from "class-transformer";
import { CreateUserRequestDTO } from "./user.request.dto";

export class FindOrCreatePatientRequestDTO extends CreateUserRequestDTO {
    @IsEnum(PatientGenderEnum)
    public readonly gender: PatientGenderEnum;
    @IsDate()
    @Type(() => Date)
    public readonly birthday: Date;
    @IsNumber()
    public readonly age: number;
}

export class CreatePatientRequestDTO extends FindOrCreatePatientRequestDTO {
    @IsStrongPassword({ minLength: 8 })
    public readonly password: string;
}

export class CreatePatientAndAssignUserRequestDTO {
    @IsNumber()
    public readonly user: number;

    @IsEnum(PatientGenderEnum)
    public gender: PatientGenderEnum;

    @IsDate()
    @Type(() => Date)
    public birthday: Date;
    
    @IsNumber()
    public age: number;
}

export class UpdatePatientRequestDTO {
    @IsEmail()
    @IsOptional()
    public readonly email?: string;
    @IsString()
    @Max(64)
    public readonly name: string;
    @IsString()
    @Max(64)
    public readonly lastname: string;
    @IsEnum(PatientGenderEnum)
    public gender: PatientGenderEnum;
    @IsDate()
    @Type(() => Date)
    public birthday: Date;
    @IsNumber()
    public age: number;
}