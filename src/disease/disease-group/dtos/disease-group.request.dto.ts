import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class POSTDiseaseGroupRequestDTO {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}

export class PATCHDiseaseGroupRequestDTO {
    @IsString()
    @IsOptional()
    public readonly name?: string;
}