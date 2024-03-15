import { IsDate, IsEmail, IsEnum, IsNumber, IsOptional, IsString, IsStrongPassword, Length, Max } from "class-validator";
import { PatientGenderEnum } from "../enums";

export class CreatePatientRequestDTO {
    @IsEmail()
    public readonly email: string;
    @IsStrongPassword({ minLength: 8 })
    public readonly password: string;
    @IsString()
    @Length(10, 10)
    public readonly dni: string;
    @IsString()
    @Max(64)
    public readonly name: string;
    @IsString()
    @Max(64)
    public readonly lastname: string;
    @IsEnum(PatientGenderEnum)
    public gender: PatientGenderEnum;
    @IsDate()
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
    public birthday: Date;
    @IsNumber()
    public age: number;
}