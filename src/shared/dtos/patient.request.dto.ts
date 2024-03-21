import { IsDate, IsEnum, IsNumber, IsStrongPassword } from "class-validator";
import { PatientGenderEnum } from "../enums";
import { Type } from "class-transformer";
import { CreateUserRequestDTO } from "./user.request.dto";
import { PartialType } from "@nestjs/mapped-types";

export class CreatePatientRequestDTO extends CreateUserRequestDTO {
    @IsStrongPassword({ minLength: 8 })
    public readonly password: string;

    @IsEnum(PatientGenderEnum)
    public readonly gender: PatientGenderEnum;

    @IsDate()
    @Type(() => Date)
    public readonly birthday: Date;

    @IsNumber()
    public readonly age: number;
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


export class UpdatePatientRequestDTO extends PartialType(CreatePatientRequestDTO) { }