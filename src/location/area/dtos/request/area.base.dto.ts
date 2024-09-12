import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AreaRequestDto {
    @IsNumber()
    public readonly management: number;

    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}