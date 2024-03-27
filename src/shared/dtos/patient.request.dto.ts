import { IsDate, IsEnum, IsNumber, IsStrongPassword } from "class-validator";
import { PatientGenderEnum } from "../enums";
import { Type } from "class-transformer";
import { CreateUserRequestDTO } from "./user.request.dto";
import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateUserCredentialRequestDTO } from "./user-credential.request.dto";

export class CreatePatientRequestDTO extends CreateUserCredentialRequestDTO {

    @IsEnum(PatientGenderEnum)
    public readonly gender: PatientGenderEnum;

    @IsDate()
    @Type(() => Date)
    public readonly birthday: Date;

    @IsNumber()
    public readonly age: number;
}


export class UpdatePatientRequestDTO extends PartialType(
    OmitType(CreatePatientRequestDTO, ['dni', 'password'])
) { }