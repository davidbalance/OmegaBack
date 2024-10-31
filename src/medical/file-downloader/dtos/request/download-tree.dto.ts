import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class DownloadTreeRequest {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    public readonly year?: string;
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    public readonly corporativeName?: string;
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    public readonly company?: string;
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    public readonly branch?: string;
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    public readonly process?: string;
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    public readonly patient?: string;
}