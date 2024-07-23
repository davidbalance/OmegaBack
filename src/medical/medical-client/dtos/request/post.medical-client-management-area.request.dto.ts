import { IsNumber, IsString } from "class-validator";

export class PostMedicalClientManagementAndAreaRequestDto {
    @IsNumber()
    public readonly managementId: number;

    @IsString()
    public readonly managementName: string;
    
    @IsNumber()
    public readonly areaId: number;

    @IsString()
    public readonly areaName: string;
}