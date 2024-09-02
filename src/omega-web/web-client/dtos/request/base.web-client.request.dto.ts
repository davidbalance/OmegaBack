import { IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class WebClientRequestDto {
    @IsNumber()
    public readonly user: number;

    @IsNumber()
    @IsNotEmpty()
    public readonly logo: number;

    @IsArray()
    @IsNotEmpty()
    public readonly resources: number[];
}