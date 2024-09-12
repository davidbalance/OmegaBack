import { Type } from "class-transformer";
import { IsEnum, IsDate } from "class-validator";
import { PatientGenderEnum } from "../../enums/patient.enum";
import { OmitType } from "@nestjs/mapped-types";
import { UserRequestDto } from "@/user/user/dtos/request/user.base.dto";

export class PatientRequestDto extends OmitType(UserRequestDto, ['email']) {

    @IsEnum(PatientGenderEnum)
    public readonly gender: PatientGenderEnum;

    @IsDate()
    @Type(() => Date)
    public readonly birthday: Date;
}