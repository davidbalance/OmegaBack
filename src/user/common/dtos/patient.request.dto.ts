import { IsDate, IsEnum, IsNumber } from "class-validator";
import { PatientGenderEnum } from "../enums";
import { CreateUserRequestDTO } from "./user.request.dto";
import { Type } from "class-transformer";
import { OmitType, PartialType } from "@nestjs/mapped-types";

export class CreatePatientRequestDTO extends CreateUserRequestDTO {
    @IsEnum(PatientGenderEnum)
    public readonly gender: PatientGenderEnum;

    @IsDate()
    @Type(() => Date)
    public readonly birthday: Date;

    @IsNumber()
    public readonly age: number;
}

class CreatePatientRequestDTOOmittedType extends OmitType(CreatePatientRequestDTO, ['dni']) { }
export class FindOnePatientAndUpdateRequestDTO extends PartialType(CreatePatientRequestDTOOmittedType) { }