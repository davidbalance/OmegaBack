import { IsArray, IsOptional, IsString, MinLength } from "class-validator";
import { Result } from "src/medical-order/result/entities/result.entity";

export class CreateOrderDto {
    @IsOptional()
    @IsString()
    public readonly filename: string;
    @IsOptional()
    @IsString()
    public readonly path: string;
    @IsOptional()
    @IsArray()
    public readonly send: string[];
    @IsArray()
    @MinLength(1)
    public readonly results: Result[];
}
