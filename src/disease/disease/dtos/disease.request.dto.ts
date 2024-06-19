import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class POSTDiseaseRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
    @IsNumber()
    public readonly group: number;
}

export class PATCHDiseaseRequestDto {
    @IsString()
    @IsOptional()
    public readonly name?: string;

    @IsNumber()
    @IsOptional()
    public readonly group?: number;
}