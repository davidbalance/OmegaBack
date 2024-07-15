import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class POSTAreaRequestDto {
    @IsNumber()
    public readonly management: number;

    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}

export class PATCHAreaRequestDto {
    @IsNumber()
    public readonly management: number;

    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}