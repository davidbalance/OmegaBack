import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsEnum, IsDate, IsOptional } from "class-validator";
import { PatientGenderEnum } from "../../enums/patient.enum";
import { UserRequestDto } from "@/user/user/dtos/request/base.user.request.dto";
import { OmitType } from "@nestjs/mapped-types";

export class PatientRequestDto extends OmitType(UserRequestDto, ['email']) {

    @IsEnum(PatientGenderEnum)
    public readonly gender: PatientGenderEnum;

    @IsDate()
    @Type(() => Date)
    public readonly birthday: Date;
}