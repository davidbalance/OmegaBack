import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsString, Length } from "class-validator";
import { PatientGenderEnum } from "../common/enums/patient.enum";

class PatientRequestDto {
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

export class POSTPatientRequestDto extends PatientRequestDto {

    @IsString()
    @IsNotEmpty()
    @Length(10, 10)
    public readonly dni: string;
}

export class PATCHPatientRequestDto extends PatientRequestDto { }