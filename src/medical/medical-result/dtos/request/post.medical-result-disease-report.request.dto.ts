import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class PostMedicalResultDiseaseReportRequestDto {
    @IsNumber()
    @IsOptional()
    public readonly year?: number;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    public readonly corporativeName?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    public readonly companyRuc?: string;
}