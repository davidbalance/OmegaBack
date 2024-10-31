import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class PostMedicalResultDiseaseReportRequestDto {
    @Transform(({ value }) => Number(value))
    @IsNumber()
    @IsOptional()
    public readonly year?: number;

    @IsString()
    @IsOptional()
    public readonly corporativeName?: string;

    @IsString()
    @IsOptional()
    public readonly companyRuc?: string;
}