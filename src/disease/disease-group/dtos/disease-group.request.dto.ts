import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class POSTDiseaseGroupRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}

export class PATCHDiseaseGroupRequestDto {
    @IsString()
    @IsOptional()
    public readonly name?: string;
}