import { UserResponseDto } from "@/user/user/dtos/user.dto";
import { Expose, Type } from "class-transformer";
import { IsString, IsNotEmpty, IsEnum, IsDate } from "class-validator";
import { PatientGenderEnum } from "../common/enums/patient.enum";

export class PatientResponseDto {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly birthday: Date;

    @Expose()
    public readonly gender: string;

    @Type(() => UserResponseDto)
    @Expose()
    public readonly user: UserResponseDto;
}

export class FlatPatientResponseDto {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly birthday: Date;

    @Expose()
    public readonly gender: string;

    @Expose()
    public readonly dni: string;

    @Expose()
    public readonly email: string;

    @Expose()
    public readonly name: string;

    @Expose()
    public readonly lastname: string;

    @Expose()
    public readonly user: number;
}

export class FlatEEQPatientResponseDto extends FlatPatientResponseDto {
    @Expose()
    public readonly role: string;
}

export class PatientRequestDto {
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