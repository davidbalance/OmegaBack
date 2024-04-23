import { OmitType, PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsEnum, IsDate } from "class-validator";
import { PatientGenderEnum } from "../enums";
import { CreateUserRequestDTO } from "./user.request.dto";

export class CreatePatientExternalRequestDTO extends CreateUserRequestDTO {
    @IsEnum(PatientGenderEnum)
    public readonly gender: PatientGenderEnum;

    @IsDate()
    @Type(() => Date)
    public readonly birthday: Date;
}

class CreatePatientRequestDTOOmittedType extends OmitType(CreatePatientExternalRequestDTO, ['dni']) { }
export class FindOnePatientAndUpdateRequestDTO extends PartialType(CreatePatientRequestDTOOmittedType) { }