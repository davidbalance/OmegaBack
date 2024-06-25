import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class POSTWebResourceRequestDto {

    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
    public readonly label: string;

    @IsString()
    @IsNotEmpty()
    public readonly address: string;

    @IsString()
    @IsNotEmpty()
    public readonly icon: string;
}

export class PATCHWebResourceRequestDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    public readonly name?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    public readonly label?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    public readonly address?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    public readonly icon?: string;
}

export class DELETEWebResourceRequestDto { }

