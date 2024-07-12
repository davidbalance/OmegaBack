import { Type } from "class-transformer";
import { IsDate, IsEmail, IsNumber, IsString } from "class-validator";

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

export class POSTMedicalClientManagementAndAreaRequestDto {
    @IsNumber()
    public readonly managementId: number;

    @IsString()
    public readonly managementName: string;
    
    @IsNumber()
    public readonly areaId: number;

    @IsString()
    public readonly areaName: string;
}