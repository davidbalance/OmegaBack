import { PATCHUserRequestDto, POSTUserRequestDto } from "@/user/user/dtos/user.request.dto";
import { Type } from "class-transformer";
import { IsDate, IsEnum } from "class-validator";
import { PatientGenderEnum } from "../common/enums/patient.enum";

export class POSTPatientRequestDto extends POSTUserRequestDto {

    @IsEnum(PatientGenderEnum)
    public readonly gender: PatientGenderEnum;

    @IsDate()
    @Type(() => Date)
    public readonly birthday: Date;
}

export class PATCHPatientRequestDto extends PATCHUserRequestDto {

    @IsEnum(PatientGenderEnum)
    public readonly gender: PatientGenderEnum;

    @IsDate()
    @Type(() => Date)
    public readonly birthday: Date;
}