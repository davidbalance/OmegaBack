import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PostAreaRequestDto {
    @IsNumber()
    public readonly management: number;

    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}