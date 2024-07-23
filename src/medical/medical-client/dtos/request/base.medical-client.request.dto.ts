import { Type } from "class-transformer";
import { IsDate, IsEmail, IsString } from "class-validator";

export class MedicalClientRequestDto {
    @IsString()
    public readonly dni: string;

    @IsString()
    public readonly fullname: string;

    @IsDate()
    @Type(() => Date)
    public readonly birthday: Date;

    @IsEmail()
    public readonly email: string;
}