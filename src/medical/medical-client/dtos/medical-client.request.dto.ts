import { Type } from "class-transformer";
import { IsDate, IsEmail, IsString } from "class-validator";

export class POSTMedicalClientRequestDto {
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